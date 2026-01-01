const test = require('node:test');
const assert = require('node:assert/strict');

const {
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
} = require('../heat-timeline-utils');

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

function localMidnightTimestamp(year, monthIndex, day) {
    const date = new Date(Date.UTC(year, monthIndex, day));
    return date.getTime() + date.getTimezoneOffset() * 60000;
}

test('createTimelineBuckets builds 5-minute increments', () => {
    const start = Date.parse('2024-01-01T00:00:00Z');
    const end = Date.parse('2024-01-01T00:15:00Z');
    const buckets = createTimelineBuckets(start, end, 5 * MINUTE);
    assert.equal(buckets.length, 4);
    assert.equal(buckets[0], start);
    assert.equal(buckets[3], end);
});

test('findNearestSample respects tolerance window', () => {
    const samples = [
        { timestamp: 0, value: 10 },
        { timestamp: 60 * 1000, value: 11 },
        { timestamp: 120 * 1000, value: 12 }
    ];
    const match = findNearestSample(samples, 65 * 1000, 10 * 1000);
    assert.equal(match.value, 11);
    const miss = findNearestSample(samples, 65 * 1000, 1000);
    assert.equal(miss, null);
});

test('buildUnifiedTimeline aligns indoor/outdoor samples', () => {
    const start = Date.parse('2024-01-01T00:00:00Z');
    const end = start + 15 * MINUTE;
    const indoor = [
        { timestamp: start, value: 20 },
        { timestamp: start + 10 * MINUTE, value: 21 }
    ];
    const outdoor = [
        { timestamp: start + 2 * MINUTE, value: -5 },
        { timestamp: start + 12 * MINUTE, value: -4 }
    ];
    const timeline = buildUnifiedTimeline({
        start,
        end,
        stepMinutes: 5,
        indoorSamples: indoor,
        outdoorSamples: outdoor,
        indoorToleranceMs: 3 * MINUTE,
        outdoorToleranceMs: 15 * MINUTE
    });
    assert.equal(timeline.length, 4);
    assert.deepEqual(
        timeline.map(entry => entry.temp_in_c),
        [20, null, 21, null]
    );
    assert.deepEqual(
        timeline.map(entry => entry.temp_out_c),
        [-5, -5, -4, -4]
    );
});

test('computeNormalizedCoolingIntervals produces normalized slope', () => {
    const start = Date.parse('2024-01-02T00:00:00Z');
    const fireEvents = [{ startTime: start }];
    const timeline = [];
    for (let i = 0; i <= 24; i += 1) {
        const ts = start + i * 5 * MINUTE;
        timeline.push({
            timestamp: ts,
            temp_in_c: 22 - (i * 0.1),
            temp_out_c: 5
        });
    }
    const intervals = computeNormalizedCoolingIntervals({
        timeline,
        fireEvents,
        minDurationMinutes: 60,
        minDelta: 2
    });
    assert.equal(intervals.length, 1);
    const interval = intervals[0];
    assert.ok(interval.slope < 0, 'slope should be negative');
    assert.ok(interval.normalized < 0, 'normalized slope should be negative');
    assert.equal(Math.round(interval.durationHours), 2);
});

test('summarizeDailyNormalizedCooling buckets by day', () => {
    const base = Date.parse('2024-01-05T00:00:00Z');
    const intervals = [
        { end: base + 2 * MINUTE, normalized: -0.4 },
        { end: base + 10 * MINUTE, normalized: -0.6 },
        { end: base + 26 * HOUR, normalized: -0.5 }
    ];
    const summary = summarizeDailyNormalizedCooling({
        intervals,
        days: 3,
        referenceTime: base + 30 * HOUR
    });
    assert.equal(summary.length, 2);
    assert.ok(summary[0].median <= 0);
});

test('median handles odd and even sets', () => {
    assert.equal(median([1, 3, 5]), 3);
    assert.equal(median([1, 3, 5, 7]), 4);
    assert.equal(median([]), null);
});

test('computeFireEffectivenessEvents captures per-fire metrics', () => {
    const start = Date.parse('2024-01-10T12:00:00Z');
    const timeline = [];
    for (let i = -6; i <= 48; i += 1) {
        const ts = start + i * 5 * MINUTE;
        timeline.push({
            timestamp: ts,
            temp_in_c: 20 + (i * 0.1),
            temp_out_c: 5
        });
    }
    const { metrics, excluded } = computeFireEffectivenessEvents({
        timeline,
        fireEvents: [{
            fireJournal: { sizeId: 'large', sizeLabel: 'Large burn' },
            startTime: start
        }]
    });
    assert.equal(excluded, 0);
    assert.equal(metrics.length, 1);
    const event = metrics[0];
    assert.equal(event.sizeId, 'large');
    assert.ok(Number.isFinite(event.gain_in));
    assert.ok(Number.isFinite(event.gain_delta));
});

test('summarizeFireEffectivenessBySize aggregates medians', () => {
    const base = Date.parse('2024-02-01T00:00:00Z');
    const metrics = [
        { ts: base, sizeId: 'large', sizeLabel: 'Large', gain_in: 3, gain_delta: 4, time_to_peak_min: 80 },
        { ts: base + HOUR, sizeId: 'large', sizeLabel: 'Large', gain_in: 5, gain_delta: 6, time_to_peak_min: 60 },
        { ts: base + 2 * HOUR, sizeId: 'medium', sizeLabel: 'Medium', gain_in: 2, gain_delta: 3, time_to_peak_min: 70 }
    ];
    const summary = summarizeFireEffectivenessBySize({
        metrics,
        lookbackMs: 7 * 24 * HOUR,
        referenceTime: base + 3 * HOUR
    });
    assert.equal(summary.length, 2);
    const large = summary.find(entry => entry.sizeId === 'large');
    assert.ok(large);
    assert.equal(large.count, 2);
    assert.equal(large.medianGainIn, 4);
});

test('computeHeatingDegreeDailyMetrics calculates HDD and ratios', () => {
    const start = localMidnightTimestamp(2024, 2, 1);
    const timeline = [];
    for (let i = 0; i < 24 * 12; i += 1) {
        timeline.push({
            timestamp: start + i * 5 * MINUTE,
            temp_out_c: 10
        });
    }
    const fireEvents = [
        { fireJournal: { sizeId: 'top-up', timestamp: start + 2 * HOUR } }
    ];
    const result = computeHeatingDegreeDailyMetrics({
        timeline,
        fireEvents,
        baseTemp: 18,
        dayCount: 1
    });
    assert.equal(result.days.length, 1);
    const day = result.days[0];
    assert.ok(day.hdd > 0);
    assert.equal(day.fireCount, 1);
    assert.equal(day.weightedFireCount, 0.5);
});

test('computeHeatingDegreeDailyMetrics handles weighted sizes', () => {
    const start = localMidnightTimestamp(2024, 2, 2);
    const timeline = [];
    for (let i = 0; i < 24 * 12; i += 1) {
        timeline.push({
            timestamp: start + i * 5 * MINUTE,
            temp_out_c: 5
        });
    }
    const fireEvents = [
        { fireJournal: { sizeId: 'medium', timestamp: start + HOUR } },
        { fireJournal: { sizeId: 'large', timestamp: start + 5 * HOUR } },
        { fireJournal: { sizeId: 'custom', sizeLabel: '2.0', timestamp: start + 9 * HOUR } }
    ];
    const result = computeHeatingDegreeDailyMetrics({
        timeline,
        fireEvents,
        baseTemp: 18,
        dayCount: 1
    });
    const day = result.days[0];
    assert.equal(day.fireCount, 3);
    assert.ok(day.weightedFireCount > 0);
});

test('computeCoolingAnomalies flags severe intervals', () => {
    const now = Date.now();
    const intervals = [
        { start: now - 6 * HOUR, end: now - 5 * HOUR, normalized: -0.5 },
        { start: now - 3 * HOUR, end: now - 2 * HOUR, normalized: -1.6 }
    ];
    const anomalies = computeCoolingAnomalies({
        intervals,
        timeline: [],
        referenceTime: now
    });
    assert.equal(anomalies.length, 1);
    assert.ok(anomalies[0].normalized < -1);
});

test('computeCoolingAnomalies marks wind-driven events', () => {
    const now = Date.now();
    const intervals = [
        { start: now - 3 * HOUR, end: now - 2 * HOUR, normalized: -1.5 }
    ];
    const timeline = [];
    for (let i = 0; i < 12; i += 1) {
        timeline.push({
            timestamp: now - (3 * HOUR) + i * 5 * MINUTE,
            temp_in_c: 22 - i * 0.2,
            wind_kph: i < 6 ? 10 : 40
        });
    }
    const anomalies = computeCoolingAnomalies({
        intervals,
        timeline,
        referenceTime: now
    });
    assert.equal(anomalies.length, 1);
    assert.equal(anomalies[0].windLikely, true);
});
