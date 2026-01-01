(function initHeatTimelineUtils(globalScope) {
    const MINUTE_MS = 60 * 1000;
    const HOUR_MS = 60 * MINUTE_MS;
    const DAY_MS = 24 * HOUR_MS;
    const DEFAULT_STEP_MINUTES = 5;

    function toTimestamp(input) {
        if (input instanceof Date) {
            return input.getTime();
        }
        if (typeof input === 'number') {
            return input;
        }
        if (typeof input === 'string') {
            const parsed = Date.parse(input);
            return Number.isNaN(parsed) ? NaN : parsed;
        }
        if (typeof input === 'object' && input && typeof input.timestamp !== 'undefined') {
            return toTimestamp(input.timestamp);
        }
        return NaN;
    }

    function normalizeSeries(samples) {
        if (!Array.isArray(samples)) {
            return [];
        }
        return samples
            .map(sample => {
                const timestamp = toTimestamp(sample);
                const value = Number(sample.value ?? sample.temp_in_c ?? sample.temp ?? sample.temperature);
                if (!Number.isFinite(value) || Number.isNaN(timestamp)) {
                    return null;
                }
                return { timestamp, value };
            })
            .filter(Boolean)
            .sort((a, b) => a.timestamp - b.timestamp);
    }

    function normalizeOutdoorSeries(samples) {
        if (!Array.isArray(samples)) {
            return [];
        }
        return samples
            .map(sample => {
                const timestamp = toTimestamp(sample);
                const tempValue = Number(sample.temp_out_c ?? sample.temp ?? sample.temperature ?? sample.value);
                if (!Number.isFinite(tempValue) || Number.isNaN(timestamp)) {
                    return null;
                }
                const windValue = Number(sample.wind_kph ?? sample.wind ?? sample.wind_speed ?? sample.windSpeed);
                return {
                    timestamp,
                    value: tempValue,
                    temp_out_c: tempValue,
                    wind_kph: Number.isFinite(windValue) ? windValue : null
                };
            })
            .filter(Boolean)
            .sort((a, b) => a.timestamp - b.timestamp);
    }

    function createTimelineBuckets(start, end, stepMs = DEFAULT_STEP_MINUTES * MINUTE_MS) {
        const startTs = toTimestamp(start);
        const endTs = toTimestamp(end);
        const step = Math.max(stepMs || MINUTE_MS, MINUTE_MS);
        if (!Number.isFinite(startTs) || !Number.isFinite(endTs) || startTs >= endTs) {
            return [];
        }
        const buckets = [];
        for (let ts = startTs; ts <= endTs; ts += step) {
            buckets.push(ts);
        }
        if (buckets[buckets.length - 1] !== endTs) {
            buckets.push(endTs);
        }
        return buckets;
    }

    function findNearestSample(samples, targetTs, toleranceMs = Infinity) {
        if (!Array.isArray(samples) || !samples.length || !Number.isFinite(targetTs)) {
            return null;
        }
        let low = 0;
        let high = samples.length - 1;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            const midTs = samples[mid].timestamp;
            if (midTs === targetTs) {
                return samples[mid];
            }
            if (midTs < targetTs) {
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        const candidates = [];
        if (low < samples.length) {
            candidates.push(samples[low]);
        }
        if (high >= 0) {
            candidates.push(samples[high]);
        }
        let best = null;
        candidates.forEach(sample => {
            const delta = Math.abs(sample.timestamp - targetTs);
            if (delta <= toleranceMs && (!best || delta < best.delta)) {
                best = { sample, delta };
            }
        });
        return best ? best.sample : null;
    }

    function buildUnifiedTimeline({
        start,
        end,
        stepMinutes = DEFAULT_STEP_MINUTES,
        indoorSamples = [],
        outdoorSamples = [],
        indoorToleranceMs = 3 * MINUTE_MS,
        outdoorToleranceMs = 15 * MINUTE_MS
    } = {}) {
        const startTs = toTimestamp(start);
        const endTs = toTimestamp(end);
        if (!Number.isFinite(startTs) || !Number.isFinite(endTs) || startTs >= endTs) {
            return [];
        }
        const stepMs = Math.max(stepMinutes * MINUTE_MS, MINUTE_MS);
        const buckets = createTimelineBuckets(startTs, endTs, stepMs);
        if (!buckets.length) {
            return [];
        }
        const indoorSeries = normalizeSeries(indoorSamples);
        const outdoorSeries = normalizeOutdoorSeries(outdoorSamples);
        return buckets.map(timestamp => {
            const indoor = findNearestSample(indoorSeries, timestamp, indoorToleranceMs);
            const outdoor = findNearestSample(outdoorSeries, timestamp, outdoorToleranceMs);
            return {
                timestamp,
                temp_in_c: indoor ? indoor.value : null,
                temp_out_c: outdoor ? outdoor.value : null,
                wind_kph: outdoor?.wind_kph ?? null
            };
        });
    }

    function computeLinearRegressionSlope(points) {
        if (!Array.isArray(points) || points.length < 2) {
            return null;
        }
        const origin = points[0].timestamp;
        if (!Number.isFinite(origin)) {
            return null;
        }
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumXX = 0;
        let count = 0;
        points.forEach(point => {
            const timestamp = toTimestamp(point.timestamp);
            const value = Number(point.value ?? point.temp_in_c);
            if (!Number.isFinite(timestamp) || !Number.isFinite(value)) {
                return;
            }
            const x = (timestamp - origin) / HOUR_MS;
            sumX += x;
            sumY += value;
            sumXY += x * value;
            sumXX += x * x;
            count += 1;
        });
        if (count < 2) {
            return null;
        }
        const numerator = sumXY - (sumX * sumY) / count;
        const denominator = sumXX - (sumX * sumX) / count;
        if (denominator === 0) {
            return null;
        }
        return numerator / denominator;
    }

    function median(values) {
        if (!Array.isArray(values) || !values.length) {
            return null;
        }
        const sorted = values
            .map(value => Number(value))
            .filter(value => Number.isFinite(value))
            .sort((a, b) => a - b);
        if (!sorted.length) {
            return null;
        }
        const mid = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) {
            return (sorted[mid - 1] + sorted[mid]) / 2;
        }
        return sorted[mid];
    }

    function percentile(values, percentileValue) {
        if (!Array.isArray(values) || !values.length) {
            return null;
        }
        const sorted = values
            .map(Number)
            .filter(Number.isFinite)
            .sort((a, b) => a - b);
        if (!sorted.length) {
            return null;
        }
        const rank = (percentileValue / 100) * (sorted.length - 1);
        const lower = Math.floor(rank);
        const upper = Math.ceil(rank);
        if (lower === upper) {
            return sorted[lower];
        }
        const weight = rank - lower;
        return sorted[lower] * (1 - weight) + sorted[upper] * weight;
    }

    function extractEventTimestamp(event) {
        if (!event) {
            return null;
        }
        const candidates = [
            event.timestamp,
            event.ts,
            event.startTime,
            event.peakTime,
            event.fireJournal?.timestamp
        ];
        for (let i = 0; i < candidates.length; i++) {
            if (Number.isFinite(candidates[i])) {
                return Number(candidates[i]);
            }
        }
        return null;
    }

    function computeNormalizedCoolingIntervals({
        timeline,
        fireEvents,
        minDurationMinutes = 60,
        minDelta = 2
    } = {}) {
        if (!Array.isArray(timeline) || !timeline.length) {
            return [];
        }
        const sortedTimeline = timeline
            .map(entry => ({
                timestamp: toTimestamp(entry.ts ?? entry.timestamp),
                temp_in_c: Number(entry.temp_in_c ?? entry.temp ?? entry.value),
                temp_out_c: Number(entry.temp_out_c ?? entry.out ?? entry.delta)
            }))
            .filter(entry => Number.isFinite(entry.timestamp) && Number.isFinite(entry.temp_in_c))
            .sort((a, b) => a.timestamp - b.timestamp);
        if (!sortedTimeline.length) {
            return [];
        }
        const timelineStart = sortedTimeline[0].timestamp;
        const timelineEnd = sortedTimeline[sortedTimeline.length - 1].timestamp;
        const eventTimes = Array.isArray(fireEvents)
            ? fireEvents
                .map(extractEventTimestamp)
                .filter(ts => Number.isFinite(ts) && ts <= timelineEnd)
                .sort((a, b) => a - b)
            : [];
        if (!eventTimes.length) {
            return [];
        }
        const minDurationMs = Math.max(minDurationMinutes, 0) * MINUTE_MS;
        const intervals = [];

        eventTimes.forEach((eventTime, index) => {
            const start = Math.max(eventTime, timelineStart);
            const nextEvent = eventTimes[index + 1];
            const end = Number.isFinite(nextEvent)
                ? Math.min(nextEvent, timelineEnd)
                : timelineEnd;
            if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start || (end - start) < minDurationMs) {
                return;
            }
            const windowPoints = sortedTimeline.filter(entry => entry.timestamp >= start && entry.timestamp <= end);
            if (windowPoints.length < 2) {
                return;
            }
            const slope = computeLinearRegressionSlope(windowPoints.map(entry => ({
                timestamp: entry.timestamp,
                value: entry.temp_in_c
            })));
            if (!Number.isFinite(slope) || slope >= 0) {
                return;
            }
            const deltaSamples = windowPoints.filter(entry => Number.isFinite(entry.temp_out_c));
            if (!deltaSamples.length) {
                return;
            }
            const avgDelta = deltaSamples.reduce((sum, entry) => sum + (entry.temp_in_c - entry.temp_out_c), 0) / deltaSamples.length;
            if (!Number.isFinite(avgDelta) || avgDelta < minDelta) {
                return;
            }
            const normalized = slope / Math.max(avgDelta, 1);
            intervals.push({
                start,
                end,
                durationHours: (end - start) / HOUR_MS,
                slope,
                avgDelta,
                normalized
            });
        });

        return intervals.sort((a, b) => a.start - b.start);
    }

    function summarizeDailyNormalizedCooling({
        intervals,
        days = 7,
        referenceTime
    } = {}) {
        if (!Array.isArray(intervals) || !intervals.length || days <= 0) {
            return [];
        }
        const ref = Number.isFinite(referenceTime)
            ? referenceTime
            : intervals[intervals.length - 1].end;
        if (!Number.isFinite(ref)) {
            return [];
        }
        const windowStart = ref - days * 24 * HOUR_MS;
        const buckets = new Map();
        intervals.forEach(interval => {
            if (!Number.isFinite(interval?.end) || interval.end < windowStart) {
                return;
            }
            if (!Number.isFinite(interval?.normalized)) {
                return;
            }
            const date = new Date(interval.end);
            if (Number.isNaN(date.getTime())) {
                return;
            }
            date.setHours(0, 0, 0, 0);
            const dayKey = date.getTime();
            const list = buckets.get(dayKey) || [];
            list.push(interval.normalized);
            buckets.set(dayKey, list);
        });

        return Array.from(buckets.entries())
            .map(([dayStart, values]) => ({
                dayStart: Number(dayStart),
                median: median(values)
            }))
            .filter(entry => Number.isFinite(entry.dayStart) && Number.isFinite(entry.median))
            .sort((a, b) => b.dayStart - a.dayStart)
            .slice(0, days);
    }

    function average(values) {
        if (!Array.isArray(values) || !values.length) {
            return null;
        }
        const valid = values.filter(Number.isFinite);
        if (!valid.length) {
            return null;
        }
        const total = valid.reduce((sum, value) => sum + value, 0);
        return total / valid.length;
    }

    function computeFireEffectivenessEvents({
        timeline,
        fireEvents,
        baselineMinutes = 10,
        analysisHours = 4
    } = {}) {
        if (!Array.isArray(timeline) || !timeline.length || !Array.isArray(fireEvents) || !fireEvents.length) {
            return { metrics: [], excluded: 0 };
        }
        const sortedTimeline = timeline
            .map(entry => ({
                timestamp: toTimestamp(entry.ts ?? entry.timestamp),
                temp_in_c: Number(entry.temp_in_c ?? entry.temp ?? entry.value),
                temp_out_c: Number(entry.temp_out_c ?? entry.out ?? entry.delta)
            }))
            .filter(entry => Number.isFinite(entry.timestamp) && Number.isFinite(entry.temp_in_c))
            .sort((a, b) => a.timestamp - b.timestamp);
        if (!sortedTimeline.length) {
            return { metrics: [], excluded: 0 };
        }
        const baselineMs = Math.max(0, baselineMinutes) * MINUTE_MS;
        const windowMs = Math.max(analysisHours, 0) * HOUR_MS;
        let excluded = 0;
        const metrics = [];

        fireEvents.forEach(event => {
            const ts = extractEventTimestamp(event);
            if (!Number.isFinite(ts)) {
                return;
            }
            const baselineStart = ts - baselineMs;
            const baselinePoints = sortedTimeline.filter(point => point.timestamp >= baselineStart && point.timestamp < ts);
            if (!baselinePoints.length) {
                excluded += 1;
                return;
            }
            const baselineIndoor = average(baselinePoints.map(point => point.temp_in_c));
            const baselineDeltaPoints = baselinePoints.filter(point => Number.isFinite(point.temp_out_c));
            const baselineDelta = average(baselineDeltaPoints.map(point => point.temp_in_c - point.temp_out_c));
            if (!Number.isFinite(baselineIndoor) || !Number.isFinite(baselineDelta)) {
                excluded += 1;
                return;
            }
            const windowPoints = sortedTimeline.filter(point => point.timestamp >= ts && point.timestamp <= ts + windowMs);
            if (!windowPoints.length) {
                excluded += 1;
                return;
            }
            const peakIndoor = windowPoints.reduce((best, point) => {
                if (!Number.isFinite(point.temp_in_c)) {
                    return best;
                }
                if (!best || point.temp_in_c > best.temp_in_c) {
                    return point;
                }
                return best;
            }, null);
            const deltaPoints = windowPoints.filter(point => Number.isFinite(point.temp_out_c));
            if (!peakIndoor || !deltaPoints.length) {
                excluded += 1;
                return;
            }
            const peakDeltaPoint = deltaPoints.reduce((best, point) => {
                const delta = point.temp_in_c - point.temp_out_c;
                if (!best || delta > best.delta) {
                    return { delta, timestamp: point.timestamp };
                }
                return best;
            }, null);
            if (!peakDeltaPoint) {
                excluded += 1;
                return;
            }
            const gainIn = peakIndoor.temp_in_c - baselineIndoor;
            const gainDelta = peakDeltaPoint.delta - baselineDelta;
            const timeToPeak = peakIndoor.timestamp
                ? (peakIndoor.timestamp - ts) / MINUTE_MS
                : null;
            const sizeId = event?.fireJournal?.sizeId ?? event?.sizeId ?? event?.size ?? 'unknown';
            const sizeLabel = event?.fireJournal?.sizeLabel ?? event?.sizeLabel ?? String(sizeId || 'Fire');
            metrics.push({
                ts,
                sizeId: String(sizeId || 'unknown'),
                sizeLabel,
                baseline_in: baselineIndoor,
                baseline_delta: baselineDelta,
                gain_in: Number.isFinite(gainIn) ? gainIn : null,
                gain_delta: Number.isFinite(gainDelta) ? gainDelta : null,
                time_to_peak_min: Number.isFinite(timeToPeak) ? timeToPeak : null
            });
        });

        return { metrics, excluded };
    }

    function summarizeFireEffectivenessBySize({
        metrics,
        lookbackMs = 30 * 24 * HOUR_MS,
        referenceTime
    } = {}) {
        if (!Array.isArray(metrics) || !metrics.length) {
            return [];
        }
        const ref = Number.isFinite(referenceTime)
            ? referenceTime
            : metrics.reduce((maxTs, metric) => Math.max(maxTs, metric.ts ?? 0), 0);
        if (!Number.isFinite(ref)) {
            return [];
        }
        const windowStart = ref - lookbackMs;
        const buckets = new Map();

        metrics.forEach(metric => {
            const timestamp = Number(metric?.ts);
            if (!Number.isFinite(timestamp) || timestamp < windowStart) {
                return;
            }
            const sizeId = metric.sizeId || 'unknown';
            const sizeLabel = metric.sizeLabel || metric.sizeId || 'Fire';
            const bucket = buckets.get(sizeId) || { sizeId, sizeLabel, values: [] };
            bucket.values.push(metric);
            buckets.set(sizeId, bucket);
        });

        return Array.from(buckets.values())
            .map(bucket => {
                const gainInValues = bucket.values.map(item => item.gain_in).filter(Number.isFinite);
                const gainDeltaValues = bucket.values.map(item => item.gain_delta).filter(Number.isFinite);
                const timeValues = bucket.values.map(item => item.time_to_peak_min).filter(Number.isFinite);
                return {
                    sizeId: bucket.sizeId,
                    sizeLabel: bucket.sizeLabel,
                    count: bucket.values.length,
                    medianGainIn: median(gainInValues),
                    medianGainDelta: median(gainDeltaValues),
                    medianTimeToPeak: median(timeValues)
                };
            })
            .filter(entry => entry.count > 0)
            .sort((a, b) => (b.count ?? 0) - (a.count ?? 0));
    }

    function computeHeatingDegreeDailyMetrics({
        timeline,
        fireEvents,
        baseTemp = 18,
        dayCount = 14
    } = {}) {
        if (!Array.isArray(timeline) || !timeline.length) {
            return { days: [], excludedFires: 0 };
        }
        const sorted = timeline
            .map(entry => ({
                timestamp: toTimestamp(entry.ts ?? entry.timestamp),
                temp_out_c: Number(entry.temp_out_c ?? entry.out ?? entry.value)
            }))
            .filter(entry => Number.isFinite(entry.timestamp))
            .sort((a, b) => a.timestamp - b.timestamp);
        if (!sorted.length) {
            return { days: [], excludedFires: 0 };
        }
        const lastTs = sorted[sorted.length - 1].timestamp;
        const lastDayStart = getDayStartTimestamp(lastTs);
        const clampedDayCount = Math.max(1, Math.floor(dayCount) || 1);
        const startDay = lastDayStart - (clampedDayCount - 1) * DAY_MS;
        const rangeStart = startDay;
        const rangeEnd = lastDayStart + DAY_MS;
        const buckets = new Map();
        for (let day = startDay; day <= lastDayStart; day += DAY_MS) {
            buckets.set(day, {
                hdHours: 0,
                fireCount: 0,
                weightedFireCount: 0
            });
        }

        for (let i = 0; i < sorted.length - 1; i++) {
            const current = sorted[i];
            const next = sorted[i + 1];
            if (!Number.isFinite(current.timestamp) || current.timestamp < rangeStart || current.timestamp >= rangeEnd) {
                continue;
            }
            if (!Number.isFinite(current.temp_out_c)) {
                continue;
            }
            const segmentStart = Math.max(current.timestamp, rangeStart);
            const segmentEnd = Math.min(next.timestamp, rangeEnd);
            const hours = (segmentEnd - segmentStart) / HOUR_MS;
            if (!Number.isFinite(hours) || hours <= 0) {
                continue;
            }
            const deficit = Math.max(0, baseTemp - current.temp_out_c);
            if (deficit <= 0) {
                continue;
            }
            const hdHours = deficit * hours;
            const dayKey = getDayStartTimestamp(current.timestamp);
            const bucket = buckets.get(dayKey);
            if (bucket) {
                bucket.hdHours += hdHours;
            }
        }

        let excluded = 0;
        const rangeEndExclusive = rangeEnd;
        (fireEvents || []).forEach(event => {
            const ts = extractEventTimestamp(event);
            if (!Number.isFinite(ts) || ts < rangeStart || ts >= rangeEndExclusive) {
                excluded += 1;
                return;
            }
            const dayKey = getDayStartTimestamp(ts);
            const bucket = buckets.get(dayKey);
            if (!bucket) {
                excluded += 1;
                return;
            }
            bucket.fireCount += 1;
            const weight = resolveFireSizeWeight(event);
            if (Number.isFinite(weight)) {
                bucket.weightedFireCount += weight;
            } else {
                excluded += 1;
            }
        });

        const days = Array.from(buckets.entries()).map(([dayStart, bucket]) => {
            const hdd = bucket.hdHours / 24;
            return {
                dayStart: Number(dayStart),
                hdHours: bucket.hdHours,
                hdd,
                fireCount: bucket.fireCount,
                weightedFireCount: bucket.weightedFireCount,
                firesPerHdd: hdd > 0 ? bucket.fireCount / hdd : null,
                weightedFiresPerHdd: hdd > 0 ? bucket.weightedFireCount / hdd : null
            };
        }).sort((a, b) => b.dayStart - a.dayStart);

        return {
            days: days.slice(0, clampedDayCount),
            baseTemp,
            excludedFires: excluded,
            rangeStart,
            rangeEnd: rangeEndExclusive
        };
    }

    function getDayStartTimestamp(timestamp) {
        if (!Number.isFinite(timestamp)) {
            return null;
        }
        const date = new Date(timestamp);
        if (Number.isNaN(date.getTime())) {
            return null;
        }
        date.setHours(0, 0, 0, 0);
        return date.getTime();
    }

    function resolveFireSizeWeight(event) {
        const defaultWeight = 1;
        const sizeIdRaw = (event?.fireJournal?.sizeId ?? event?.sizeId ?? event?.size ?? '').toString().toLowerCase();
        if (sizeIdRaw === 'top-up' || sizeIdRaw === 'topup') {
            return 0.5;
        }
        if (sizeIdRaw === 'medium') {
            return 1;
        }
        if (sizeIdRaw === 'large') {
            return 1.5;
        }
        if (sizeIdRaw === 'custom') {
            const custom = parseNumericToken(
                event?.fireJournal?.sizeLabel
                ?? event?.sizeLabel
                ?? event?.fireJournal?.detail
                ?? event?.detail
                ?? ''
            );
            if (Number.isFinite(custom) && custom > 0) {
                return custom;
            }
            return defaultWeight;
        }
        const numericId = parseNumericToken(sizeIdRaw);
        if (Number.isFinite(numericId) && numericId > 0) {
            return numericId;
        }
        return defaultWeight;
    }

    function parseNumericToken(value) {
        if (typeof value !== 'string') {
            return null;
        }
        const match = value.match(/-?\d+(\.\d+)?/);
        if (!match) {
            return null;
        }
        const parsed = Number.parseFloat(match[0]);
        return Number.isFinite(parsed) ? parsed : null;
    }

    function computePearsonCorrelation(pairs) {
        if (!Array.isArray(pairs) || pairs.length < 2) {
            return null;
        }
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumXX = 0;
        let sumYY = 0;
        let count = 0;
        pairs.forEach(pair => {
            const x = Number(pair.x);
            const y = Number(pair.y);
            if (!Number.isFinite(x) || !Number.isFinite(y)) {
                return;
            }
            sumX += x;
            sumY += y;
            sumXY += x * y;
            sumXX += x * x;
            sumYY += y * y;
            count += 1;
        });
        if (count < 2) {
            return null;
        }
        const numerator = (count * sumXY) - (sumX * sumY);
        const denominator = Math.sqrt((count * sumXX - sumX * sumX) * (count * sumYY - sumY * sumY));
        if (denominator === 0) {
            return null;
        }
        return numerator / denominator;
    }

    function computeCoolingWindCorrelation(timeline) {
        if (!Array.isArray(timeline) || timeline.length < 3) {
            return null;
        }
        const pairs = [];
        for (let i = 1; i < timeline.length; i++) {
            const prev = timeline[i - 1];
            const curr = timeline[i];
            if (!Number.isFinite(prev?.temp_in_c) || !Number.isFinite(curr?.temp_in_c)) {
                continue;
            }
            const wind = Number(curr.wind_kph ?? prev.wind_kph);
            if (!Number.isFinite(wind)) {
                continue;
            }
            const deltaMs = curr.timestamp - prev.timestamp;
            if (!Number.isFinite(deltaMs) || deltaMs <= 0) {
                continue;
            }
            const coolingRate = (prev.temp_in_c - curr.temp_in_c) / (deltaMs / HOUR_MS);
            if (!Number.isFinite(coolingRate)) {
                continue;
            }
            pairs.push({
                x: wind,
                y: Math.max(coolingRate, 0)
            });
        }
        if (pairs.length < 3) {
            return null;
        }
        return computePearsonCorrelation(pairs);
    }

    function computeCoolingAnomalies({
        intervals,
        timeline,
        lookbackMs = 7 * DAY_MS,
        referenceTime
    } = {}) {
        if (!Array.isArray(intervals) || !intervals.length) {
            return [];
        }
        const ref = Number.isFinite(referenceTime)
            ? referenceTime
            : intervals[intervals.length - 1]?.end;
        if (!Number.isFinite(ref)) {
            return [];
        }
        const windowStart = ref - lookbackMs;
        const windowIntervals = intervals.filter(interval => Number.isFinite(interval?.end) && interval.end >= windowStart);
        if (!windowIntervals.length) {
            return [];
        }
        const normalizedValues = windowIntervals
            .map(interval => interval.normalized)
            .filter(Number.isFinite);
        if (!normalizedValues.length) {
            return [];
        }
        const baselineMedian = median(normalizedValues);
        if (baselineMedian === null) {
            return [];
        }
        const q1 = percentile(normalizedValues, 25);
        const q3 = percentile(normalizedValues, 75);
        const iqr = Number.isFinite(q1) && Number.isFinite(q3) ? (q3 - q1) : null;
        const thresholds = [];
        if (windowIntervals.length === 1 && Number.isFinite(baselineMedian)) {
            thresholds.push(baselineMedian + 0.01);
        }
        if (Number.isFinite(iqr) && iqr > 0) {
            thresholds.push(baselineMedian - 2 * iqr);
        }
        const percentThreshold = baselineMedian < 0
            ? baselineMedian * 1.3
            : baselineMedian - Math.abs(baselineMedian) * 0.3;
        if (Number.isFinite(percentThreshold)) {
            thresholds.push(percentThreshold);
        }
        thresholds.push(baselineMedian - 0.5);
        const numericThresholds = thresholds.filter(Number.isFinite);
        if (!numericThresholds.length) {
            return [];
        }
        const triggerThreshold = Math.max(...numericThresholds);
        if (!Number.isFinite(triggerThreshold)) {
            return [];
        }
        const timelineWindow = Array.isArray(timeline)
            ? timeline.filter(entry => Number.isFinite(entry.timestamp) && entry.timestamp >= windowStart && entry.timestamp <= ref)
            : [];
        const windValues = timelineWindow
            .map(entry => Number(entry.wind_kph))
            .filter(Number.isFinite);
        const wind75 = windValues.length ? percentile(windValues, 75) : null;
        let windCorrelation = computeCoolingWindCorrelation(timelineWindow);
        if (Number.isFinite(windCorrelation) && Math.abs(windCorrelation) < 0.05) {
            windCorrelation = null;
        }
        return windowIntervals
            .filter(interval => Number.isFinite(interval.normalized) && interval.normalized < triggerThreshold)
            .map(interval => {
                let windLikely = false;
                if (Number.isFinite(wind75)) {
                    const intervalHasHighWind = timelineWindow.some(entry => {
                        if (!Number.isFinite(entry.wind_kph)) {
                            return false;
                        }
                        return entry.timestamp >= interval.start
                            && entry.timestamp <= interval.end
                            && entry.wind_kph >= wind75;
                    });
                    if (intervalHasHighWind) {
                        windLikely = Number.isFinite(windCorrelation)
                            ? windCorrelation > 0.3
                            : true;
                    }
                }
                const severityRatio = baselineMedian !== 0
                    ? Math.abs(interval.normalized / baselineMedian)
                    : Math.abs(interval.normalized);
                return {
                    start: interval.start,
                    end: interval.end,
                    normalized: interval.normalized,
                    median: baselineMedian,
                    threshold: triggerThreshold,
                    severityRatio,
                    windLikely
                };
            })
            .sort((a, b) => a.normalized - b.normalized);
    }


    const api = {
        createTimelineBuckets,
        findNearestSample,
        buildUnifiedTimeline,
        computeNormalizedCoolingIntervals,
        summarizeDailyNormalizedCooling,
        computeFireEffectivenessEvents,
        summarizeFireEffectivenessBySize,
        computeHeatingDegreeDailyMetrics,
        computeCoolingAnomalies,
        median
    };

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = api;
    }
    if (globalScope) {
        globalScope.HeatTimelineUtils = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : (typeof window !== 'undefined' ? window : this));
