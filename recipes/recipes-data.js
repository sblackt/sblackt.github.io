    const defaultRecipes = [
      {
        id: 'roasted-musquee-dhiver-bonfire-soup',
        name: 'Roasted Musquée d’Hiver Bonfire Soup',
        cuisine: 'French',
        version: 1,
        servings: {
          count: 8,
          note: 'Easily stretches to 10 smaller mugs.'
        },
        metadata: {
          style: 'smooth mug-friendly squash soup',
          diet: {
            vegetarian: true,
            vegan: true,
            gluten_free: true,
            contains_dairy: false,
            contains_lentils: false
          },
          context: 'Made for an outdoor bonfire potluck, served in mugs.'
        },
        components: [
          {
            id: 'bonfire-soup-core',
            name: 'Bonfire Soup Base',
            kind: 'soup',
            ingredients: [
              {
                section: 'Roasted squash',
                items: [
                  {
                    name: 'Musquée d’Hiver de Provence squash',
                    amount: 1,
                    unit: 'large',
                    prep: 'cut into wedges, seeds removed',
                    notes: 'Basketball-sized; expect ~7–9 cups roasted flesh.',
                    substitutions: [
                      {
                        name: 'Butternut squash',
                        ratio: '1:1 by weight',
                        notes: 'Flavour slightly less complex, still great.'
                      },
                      {
                        name: 'Kabocha squash',
                        ratio: '1:1 by weight',
                        notes: 'Denser; you may need 1–2 extra cups stock.'
                      }
                    ]
                  },
                  {
                    name: 'Olive oil',
                    amount: 2,
                    unit: 'tbsp',
                    prep: 'for roasting',
                    substitutions: [
                      {
                        name: 'Neutral oil (canola, sunflower, etc.)',
                        ratio: '1:1'
                      },
                      {
                        name: 'Melted butter',
                        ratio: '1:1',
                        notes: 'Adds richness, not vegan.'
                      }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: 'for roasting squash',
                    substitutions: []
                  },
                  {
                    name: 'Black pepper',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: 'for roasting squash',
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Soup base',
                items: [
                  {
                    name: 'Olive oil',
                    amount: 2,
                    unit: 'tbsp',
                    prep: 'for sautéing',
                    substitutions: [
                      {
                        name: 'Butter',
                        ratio: '1:1',
                        notes: 'Richer flavour, not vegan.'
                      },
                      {
                        name: 'Neutral oil',
                        ratio: '1:1'
                      }
                    ]
                  },
                  {
                    name: 'Onions',
                    amount: 2,
                    unit: 'medium',
                    prep: 'roughly chopped',
                    substitutions: [
                      {
                        name: 'Leeks',
                        ratio: '2 medium onions ≈ 3 leeks (white + light green parts)',
                        notes: 'Sweeter, milder flavour.'
                      },
                      {
                        name: 'Shallots',
                        ratio: '2 medium onions ≈ 4–5 large shallots'
                      }
                    ]
                  },
                  {
                    name: 'Garlic cloves',
                    amount: 4,
                    unit: 'cloves',
                    prep: 'sliced or minced',
                    substitutions: [
                      {
                        name: 'Garlic powder',
                        ratio: '1 clove ≈ 1/4 tsp powder'
                      }
                    ]
                  },
                  {
                    name: 'Fresh ginger',
                    amount: 1.5,
                    unit: 'tbsp',
                    prep: 'finely grated or minced',
                    notes: 'Use more (up to 2 tbsp) if you want stronger ginger.',
                    substitutions: [
                      {
                        name: 'Ground ginger',
                        ratio: '1 tbsp fresh ≈ 1 tsp ground'
                      }
                    ]
                  },
                  {
                    name: 'Curry powder',
                    amount: 2,
                    unit: 'tsp',
                    prep: 'added to aromatics',
                    notes: 'Use a mild or medium curry powder.',
                    substitutions: [
                      {
                        name: 'Red or yellow curry paste',
                        ratio: '2 tsp powder ≈ 1 tbsp paste',
                        notes: 'Fry paste with the aromatics.'
                      },
                      {
                        name: 'Garam masala',
                        ratio: '1:1',
                        notes: 'More warming spice, less turmeric.'
                      }
                    ]
                  },
                  {
                    name: 'Vegetable or chicken stock',
                    amount: 6,
                    unit: 'cups',
                    prep: 'added before simmering',
                    notes: 'Start with 6 cups; you may add 1–2 cups more after blending to adjust thickness.',
                    substitutions: [
                      {
                        name: 'Water + bouillon',
                        ratio: 'Use as directed on bouillon packaging.'
                      }
                    ]
                  },
                  {
                    name: 'Coconut milk',
                    amount: 160,
                    unit: 'ml',
                    prep: 'stirred in before blending',
                    notes: 'Small can; adds gentle richness without dominating.',
                    substitutions: [
                      {
                        name: 'Heavy cream',
                        ratio: '160 ml ≈ 2/3 cup',
                        notes: 'Not vegan; richer, more dairy-forward.'
                      },
                      {
                        name: 'Evaporated milk',
                        ratio: '1:1',
                        notes: 'Milder flavour; good pantry option.'
                      },
                      {
                        name: 'Additional stock',
                        ratio: '1:1',
                        notes: 'If you want to keep it low-fat; soup will be lighter.'
                      }
                    ]
                  },
                  {
                    name: 'Maple syrup',
                    amount: 1,
                    unit: 'tbsp',
                    prep: 'added after blending',
                    notes: 'Balances acidity and enhances squash sweetness.',
                    substitutions: [
                      {
                        name: 'Brown sugar',
                        ratio: '1 tbsp maple ≈ 1 tbsp packed brown sugar'
                      },
                      {
                        name: 'Honey',
                        ratio: '1:1',
                        notes: 'Not vegan.'
                      }
                    ]
                  },
                  {
                    name: 'Lime juice',
                    amount: 1,
                    unit: 'lime',
                    prep: 'juiced and added to taste',
                    notes: 'Start with half the lime, then adjust.',
                    substitutions: [
                      {
                        name: 'Apple cider vinegar',
                        ratio: '1 lime ≈ 2–3 tsp vinegar'
                      },
                      {
                        name: 'White wine vinegar',
                        ratio: '1:1 with cider vinegar'
                      }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: 1.5,
                    unit: 'tsp',
                    prep: 'to taste, added in stages',
                    notes: 'Start with 1 tsp in the pot after blending, then adjust.',
                    substitutions: []
                  },
                  {
                    name: 'Black pepper',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: 'freshly ground, to taste',
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Optional richness and depth',
                items: [
                  {
                    name: 'Butter',
                    amount: 2,
                    unit: 'tbsp',
                    prep: 'stirred in at the end, off heat',
                    optional: true,
                    notes: 'Softens brightness and adds "bass notes".',
                    substitutions: [
                      {
                        name: 'Olive oil',
                        ratio: '1:1',
                        notes: 'Keeps it dairy-free/vegan.'
                      },
                      {
                        name: 'Heavy cream',
                        ratio: '2 tbsp butter ≈ 1/4 cup cream',
                        notes: 'Richer, creamier mouthfeel.'
                      }
                    ]
                  },
                  {
                    name: 'Miso paste',
                    amount: 1,
                    unit: 'tbsp',
                    prep: 'dissolved in a little warm soup, then stirred in',
                    optional: true,
                    notes: 'Adds umami and depth if the soup tastes too bright.',
                    substitutions: [
                      {
                        name: 'Soy sauce',
                        ratio: '1 tbsp miso ≈ 1–2 tsp soy sauce',
                        notes: 'Add gradually to avoid over-salting.'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Optional toppings for serving',
                items: [
                  {
                    name: 'Chili crisp or chili oil',
                    amount: null,
                    unit: null,
                    optional: true,
                    notes: 'A tiny spoonful on each mug adds heat and texture.',
                    substitutions: []
                  },
                  {
                    name: 'Toasted pumpkin seeds (pepitas)',
                    amount: null,
                    unit: null,
                    optional: true,
                    notes: 'Add crunch and nutty flavour.',
                    substitutions: []
                  },
                  {
                    name: 'Crispy fried onions',
                    amount: null,
                    unit: null,
                    optional: true,
                    notes: 'Great garnish for bonfire vibes.',
                    substitutions: []
                  },
                  {
                    name: 'Yogurt or sour cream',
                    amount: null,
                    unit: null,
                    optional: true,
                    notes: 'Swirl on top if you don’t need it vegan.',
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Roast the squash',
                instructions: [
                  'Preheat oven to 400°F (200°C).',
                  'Cut the Musquée d’Hiver squash into large wedges and scoop out the seeds.',
                  'Place wedges on a baking tray. Drizzle with 2 tbsp olive oil, and season with about 1/2 tsp salt and 1/4 tsp black pepper.',
                  'Roast for 45–60 minutes, or until the flesh is very soft and the edges are caramelized and lightly browned.',
                  'Remove from oven and let cool enough to handle. Scoop all the flesh away from the skin and set aside. You should have roughly 7–9 cups of roasted squash.'
                ]
              },
              {
                order: 2,
                title: 'Build the aromatic base',
                instructions: [
                  'In a large soup pot or Dutch oven, heat 2 tbsp olive oil over medium heat.',
                  'Add the chopped onions and cook for 5–7 minutes, stirring occasionally, until softened and lightly golden.',
                  'Add the sliced or minced garlic and grated ginger. Cook for 1–2 minutes, stirring, until fragrant (do not let the garlic burn).',
                  'Sprinkle in the curry powder and stir, toasting the spices for about 30 seconds.'
                ]
              },
              {
                order: 3,
                title: 'Add squash and stock, then simmer',
                instructions: [
                  'Add all of the roasted squash flesh to the pot with the aromatics.',
                  'Pour in 6 cups of stock to start (reserve any extra stock for adjusting thickness later).',
                  'Stir well, bring to a gentle simmer, and cook for 10–15 minutes to let the flavours meld.'
                ]
              },
              {
                order: 4,
                title: 'Add coconut milk and blend',
                instructions: [
                  'Pour in the 160 ml can of coconut milk and stir to combine.',
                  'Use an immersion blender to blend the soup directly in the pot until completely smooth and velvety. (Alternatively, carefully blend in batches in a countertop blender and return to the pot.)',
                  'Check the thickness. It should be thick enough to coat a spoon and pour slowly into a mug. If it is too thick, add more stock 1/2 cup at a time, blending or stirring after each addition until you reach your preferred mug-friendly consistency.'
                ]
              },
              {
                order: 5,
                title: 'Season, balance brightness, and enrich',
                instructions: [
                  'With the soup blended, stir in about 1 tbsp maple syrup.',
                  'Add the juice of 1/2 lime first, stir, and taste. If you want more brightness, add the remaining lime juice; if it already tastes bright, stop here.',
                  'Add 1 tsp salt and 1/4–1/2 tsp black pepper, then taste. Gradually add more salt if needed; proper seasoning will also help soften any sharp acidity.',
                  'If the soup tastes too bright or sharp, stir in 2 tbsp butter (or a splash of cream or olive oil) off the heat to round out the flavour.',
                  'For deeper "bass notes", optionally dissolve 1 tbsp miso paste in a small ladle of hot soup, then stir that back into the pot. Alternatively, add 1–2 tsp soy sauce instead, tasting as you go.',
                  'Simmer very gently for another 5 minutes, then taste again and make final adjustments to salt, sweetness (a few more drops of maple), and acidity (a small extra splash of lime or vinegar only if it now feels too flat).'
                ]
              },
              {
                order: 6,
                title: 'Adjust for bonfire serving',
                instructions: [
                  'Aim for the soup to be slightly thicker than you ultimately want; it will loosen a little as it stays hot outside.',
                  'If the soup is too thin, simmer it uncovered for 5–10 minutes, stirring occasionally, until slightly reduced and thickened.',
                  'Bring the soup up to a hot serving temperature before transporting it to the bonfire.',
                  'Transfer to an insulated pot, thermos, or slow cooker set to "keep warm" for serving in mugs.'
                ]
              },
              {
                order: 7,
                title: 'Serve in mugs',
                instructions: [
                  'Ladle the hot soup into sturdy mugs.',
                  'Offer toppings such as chili crisp, toasted pumpkin seeds, crispy onions, or a spoonful of yogurt/sour cream for people to add themselves.',
                  'Serve immediately and keep the remainder covered so it stays hot and free of ash near the fire.'
                ]
              }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Roast squash',
            items: [
              { component: 'bonfire-soup-core', step: 1 }
            ]
          },
          {
            order: 2,
            label: 'Build flavour base',
            items: [
              { component: 'bonfire-soup-core', step: 2 },
              { component: 'bonfire-soup-core', step: 3 }
            ]
          },
          {
            order: 3,
            label: 'Blend + balance',
            items: [
              { component: 'bonfire-soup-core', step: 4 },
              { component: 'bonfire-soup-core', step: 5 }
            ]
          },
          {
            order: 4,
            label: 'Finish + serve',
            items: [
              { component: 'bonfire-soup-core', step: 6 },
              { component: 'bonfire-soup-core', step: 7 }
            ]
          }
        ],
        substitution_summary: {
          dairy_free: 'Use olive oil instead of butter and skip cream/yogurt/sour cream.',
          vegan: 'Use vegetable stock, olive oil instead of butter, and avoid dairy toppings.',
          extra_rich: 'Increase coconut milk to 400 ml if available, or add up to 1/2 cup heavy cream at the end.',
          less_bright: 'Use less lime/vinegar, add butter or oil, a bit more maple syrup, and optional miso/soy for depth.',
          spicier: 'Add extra curry powder or a pinch of chili flakes to the aromatics, and/or serve with chili crisp.'
        }
      },
      {
        id: 'weeknight-beef-pho-steves-version',
        name: 'Weeknight Beef Pho (Steve\'s Version)',
        cuisine: 'Vietnamese',
        version: 1,
        servings: {
          count: 4,
          note: 'Generous bowls'
        },
        metadata: {
          style: 'Vietnamese beef pho (quick broth)',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: true,
            contains_dairy: false,
            contains_lentils: false
          },
          context: 'Made with Italian basil, spinach, optional shredded carrot, and optional toasted cashews due to lack of cilantro, parsley, or bean sprouts.'
        },
        components: [
          {
            id: 'weeknight-pho-broth',
            name: 'Quick Pho Broth',
            kind: 'broth',
            ingredients: [
              {
                section: 'Broth Base',
                items: [
                  {
                    name: 'Beef bones (marrow/knuckle)',
                    amount: 2,
                    unit: 'lbs',
                    prep: '',
                    notes: 'Oxtail optional',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Chicken bones',
                        ratio: '1:1',
                        notes: 'Turns it into pho ga-style broth'
                      }
                    ]
                  },
                  {
                    name: 'Water',
                    amount: 3,
                    unit: 'L',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Onion',
                    amount: 1,
                    unit: 'whole',
                    prep: 'halved, charred',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ginger',
                    amount: 4,
                    unit: 'inch',
                    prep: 'halved, charred',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Garlic cloves',
                    amount: 4,
                    unit: 'cloves',
                    prep: 'lightly charred',
                    notes: '',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Fish sauce',
                    amount: 2,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'More added later for seasoning',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Soy sauce',
                        ratio: '1:1',
                        notes: 'Different flavour but adds umami'
                      }
                    ]
                  },
                  {
                    name: 'Sugar',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Maple syrup also works',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Maple syrup',
                        ratio: '1:1',
                        notes: 'Adds a deeper sweetness'
                      }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Adjust to taste',
                    optional: false,
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Pho Spice Mix',
                items: [
                  {
                    name: 'Star anise',
                    amount: 3,
                    unit: 'pods',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Cinnamon stick',
                    amount: 1,
                    unit: 'stick',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Cloves',
                    amount: 4,
                    unit: 'whole',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Coriander seed',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Fennel seed',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: true,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Char Aromatics',
                instructions: [
                  'Place onion and ginger cut-side down in a hot pan until deeply charred.',
                  'Lightly char garlic near the end.'
                ]
              },
              {
                order: 2,
                title: 'Make the Broth',
                instructions: [
                  'Combine bones, charred aromatics, spices, water, fish sauce, sugar, and salt.',
                  'Instant Pot: pressure cook 45 minutes, natural release 10 minutes.',
                  'Stovetop: simmer 90 minutes after briefly parboiling the bones.'
                ]
              },
              {
                order: 3,
                title: 'Strain & Season',
                instructions: [
                  'Strain broth and remove solids.',
                  'Season with additional fish sauce, salt, and a small amount of sugar or maple syrup until bright and balanced.'
                ]
              }
            ]
          },
          {
            id: 'weeknight-pho-assembly',
            name: 'Assembly & Finish',
            kind: 'assembly',
            ingredients: [
              {
                section: 'Protein',
                items: [
                  {
                    name: 'Beef (sirloin, flank, or brisket)',
                    amount: 350,
                    unit: 'g',
                    prep: 'thin-sliced',
                    notes: 'Freeze 20–30 min for easier slicing',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Leftover roast beef',
                        ratio: '1:1',
                        notes: 'Slice thin; heat with broth'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Noodles & Toppings',
                items: [
                  {
                    name: 'Rice noodles',
                    amount: 400,
                    unit: 'g',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Spinach',
                    amount: 2,
                    unit: 'cups',
                    prep: '',
                    notes: 'Added raw to bowl to wilt',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Shredded carrot',
                    amount: 0.5,
                    unit: 'cup',
                    prep: 'thin matchsticks',
                    notes: 'Adds crunch since no bean sprouts',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Italian basil',
                    amount: 0.5,
                    unit: 'cup',
                    prep: 'sliced into thin ribbons',
                    notes: 'Acts as fresh herb substitute',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Onion',
                    amount: 0.5,
                    unit: 'whole',
                    prep: 'thin-sliced raw',
                    notes: 'Classic pho topping',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Green onion',
                    amount: 4,
                    unit: 'stalks',
                    prep: 'thin-sliced',
                    notes: 'Replaces cilantro brightness',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Toasted cashews',
                    amount: 2,
                    unit: 'tbsp',
                    prep: 'chopped',
                    notes: 'Optional crunchy garnish',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Lime',
                    amount: 1,
                    unit: 'whole',
                    prep: 'cut into wedges',
                    notes: 'Critical brightness',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Hoisin',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'For dipping or drizzling',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Sriracha',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: '',
                    optional: true,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Prep Noodles & Toppings',
                instructions: [
                  'Cook rice noodles separately for 1–2 minutes and rinse briefly.',
                  'Slice beef thin (partially frozen helps).',
                  'Prep basil ribbons, spinach, shredded carrot, onion, and green onion.',
                  'Toast and chop cashews if using.'
                ]
              },
              {
                order: 2,
                title: 'Assemble Bowls',
                instructions: [
                  'Place noodles in each bowl.',
                  'Add raw beef slices on top.',
                  'Add spinach, carrot, onion, and green onion.',
                  'Pour boiling-hot broth over to cook the beef.',
                  'Garnish with basil and a tiny pinch of cashews.',
                  'Serve with lime, hoisin, and sriracha.'
                ]
              }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Char aromatics',
            items: [
              { component: 'weeknight-pho-broth', step: 1 }
            ]
          },
          {
            order: 2,
            label: 'Cook broth',
            items: [
              { component: 'weeknight-pho-broth', step: 2 }
            ]
          },
          {
            order: 3,
            label: 'Strain & season',
            items: [
              { component: 'weeknight-pho-broth', step: 3 }
            ]
          },
          {
            order: 4,
            label: 'Prep toppings',
            items: [
              { component: 'weeknight-pho-assembly', step: 1 }
            ]
          },
          {
            order: 5,
            label: 'Assemble bowls',
            items: [
              { component: 'weeknight-pho-assembly', step: 2 }
            ]
          }
        ],
        substitution_summary: {
          dairy_free: 'Already dairy-free.',
          vegan: 'Use vegetable stock, omit beef, replace fish sauce with soy and add tofu.',
          extra_rich: 'Add a small piece of brisket or a teaspoon of beef tallow to the broth.',
          less_bright: 'Use less lime and reduce fish sauce slightly.',
        spicier: 'Add sliced fresh chili, chili oil, or extra sriracha.'
        }
      },
      {
        id: 'south-indian-dosa-meal-red-lentil-rice',
        name: 'South Indian Dosa Meal (Red Lentil & Rice, Electric Stove Friendly)',
        cuisine: 'Indian',
        version: 1,
        servings: {
          count: 4,
          note: 'Makes enough dosa batter for ~8–10 medium dosas plus sides for 4 people.'
        },
        metadata: {
          style: 'South Indian dosa platter (dosa + potato masala + sambar + coconut chutney + red chutney)',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: true,
            contains_dairy: true,
            contains_lentils: true
          },
          context: 'Dosa meal adapted for long-grain + parboiled rice, red lentils instead of urad dal, glass-top electric stove, 14" cast iron pan, dried coconut + cashews chutney, and red lentil sambar.'
        },
        components: [
          {
            id: 'dosa_batter',
            name: 'Red Lentil & Rice Dosa Batter',
            kind: 'main',
            ingredients: [
              {
                section: 'Rice & lentil base',
                items: [
                  {
                    name: 'Long-grain white rice',
                    amount: 1.5,
                    unit: 'cup',
                    prep: 'rinsed until water runs mostly clear',
                    notes: 'Part of the 50/50 rice mix',
                    optional: false,
                    substitutions: [
                      {
                        name: 'medium-grain rice (Calrose)',
                        ratio: '1:1',
                        notes: 'Gives slightly softer dosa; keep total rice volume the same.'
                      }
                    ]
                  },
                  {
                    name: 'Parboiled rice',
                    amount: 1.5,
                    unit: 'cup',
                    prep: 'rinsed',
                    notes: 'Mimics idli rice when combined 50/50 with long-grain rice.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'idli rice',
                        ratio: '1:1',
                        notes: 'Use 3 cups idli rice and omit the long-grain/parboiled split.'
                      },
                      {
                        name: 'long-grain white rice',
                        ratio: '1:1',
                        notes: 'Use all long-grain white if you cannot find parboiled; dosa will still work well.'
                      }
                    ]
                  },
                  {
                    name: 'Red lentils (masoor dal)',
                    amount: 1,
                    unit: 'cup',
                    prep: 'rinsed',
                    notes: 'Substitutes for urad dal in this version.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'whole or split urad dal (skinless)',
                        ratio: '1:1',
                        notes: 'Traditional dosa; gives slightly better fermentation and texture.'
                      },
                      {
                        name: 'yellow moong dal',
                        ratio: '1:1',
                        notes: 'Gives very crisp, lighter dosa with a slightly different flavour.'
                      }
                    ]
                  },
                  {
                    name: 'Fenugreek seeds',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Helps fermentation and adds classic dosa flavour.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'fenugreek powder',
                        ratio: '1:1 by volume',
                        notes: 'Add directly while grinding if you don’t have whole seeds.'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Optional fermentation & texture boosters',
                items: [
                  {
                    name: 'Poha (flattened rice) or cooked rice',
                    amount: 2,
                    unit: 'tbsp',
                    prep: 'if using poha, soak with rice in the last 20–30 minutes; if cooked rice, add directly when grinding rice',
                    notes: 'Improves fermentation and crispness, especially with non-idli rice.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'rice flour',
                        ratio: '1:1 by volume',
                        notes: 'Add while adjusting final batter consistency before cooking.'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Seasoning & hydration',
                items: [
                  {
                    name: 'Salt',
                    amount: 2,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adjust to taste; added after grinding and mixing the batter.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Water',
                    amount: null,
                    unit: 'ml',
                    prep: '',
                    notes: 'Use as needed while grinding and to thin the batter to a heavy-cream consistency before cooking.',
                    optional: false,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Soak rice and lentils',
                instructions: [
                  'Combine the long-grain white rice, parboiled rice, and fenugreek seeds in a bowl and cover with plenty of water (at least 5 cm above the grains).',
                  'In a separate bowl, add the red lentils and cover with water.',
                  'If using poha, add it to the rice bowl for the last 20–30 minutes of soaking.',
                  'Soak both bowls at room temperature for 6–8 hours.'
                ]
              },
              {
                order: 2,
                title: 'Grind lentils smooth',
                instructions: [
                  'Drain the soaked red lentils well so they are damp but not swimming in water.',
                  'Transfer lentils to a food processor (or blender) with 2–3 tablespoons of fresh water.',
                  'Pulse in 10–15 second bursts, scraping down the sides and adding 1 tablespoon of water at a time as needed, until you have a very smooth, thick, pourable paste.',
                  'Target consistency: smooth, slightly fluffy, and falling off a spoon in a thick ribbon without visible graininess.'
                ]
              },
              {
                order: 3,
                title: 'Grind rice slightly coarse',
                instructions: [
                  'Drain the soaked rice (and poha if using) very well so it is just damp.',
                  'Add rice to the food processor with 2–4 tablespoons of fresh water.',
                  'Pulse in short bursts, scraping down often, until the texture resembles fine semolina or wet sand: tiny grains but no sharp hard pieces.',
                  'Avoid over-grinding to a completely smooth paste, which can make the dosa rubbery in texture.'
                ]
              },
              {
                order: 4,
                title: 'Combine, salt, and adjust batter',
                instructions: [
                  'Transfer the lentil paste and ground rice into a large bowl with plenty of room for the batter to rise.',
                  'Add the salt and gently fold everything together to combine without beating out too much air from the lentils.',
                  'Adjust with a little water if needed so the batter is thick but pourable—slightly thicker than pancake batter at this stage.'
                ]
              },
              {
                order: 5,
                title: 'Ferment the batter',
                instructions: [
                  'Cover the bowl loosely and place it in a warm spot (such as an oven with the light on) at around 25–32°C.',
                  'Ferment for 12–20 hours, or until the batter has increased in volume by about 75–100%, looks airy and bubbly on top, and smells pleasantly tangy.',
                  'If the ambient temperature is warm and fermentation is very active, monitor earlier (8–12 hours) to avoid over-souring.',
                  'Once fermented, gently stir to redistribute bubbles, then refrigerate if you are not cooking immediately.'
                ]
              },
              {
                order: 6,
                title: 'Prepare batter for cooking',
                instructions: [
                  'When ready to cook dosa, remove the batter from the fridge about 30–60 minutes ahead to take off the chill.',
                  'Stir gently, then thin the batter with a few tablespoons of water at a time until it flows like heavy cream: it should pour easily from a ladle and spread thinly on the pan without clumping.',
                  'If the batter is too thick, the dosa will not spread well; if it is too thin, it will not hold together, so adjust gradually.'
                ]
              },
              {
                order: 7,
                title: 'Cook dosa on cast iron over electric glass-top stove',
                instructions: [
                  'Place a 14" cast iron pan over the largest burner of your glass-top electric stove and preheat on medium-high for 10–12 minutes so the heat can spread from the center toward the edges.',
                  'Test the heat by sprinkling a few drops of water on the pan: they should sizzle and evaporate quickly without instantly burning.',
                  'Rub the surface lightly with a cut onion dipped in a small amount of oil to create a thin, even film without pooling.',
                  'Reduce heat slightly to medium, pour a ladle of batter into the center, and quickly spread it in a spiral outward to form a thin dosa, aiming to stay within the most evenly heated 11–12" zone of the pan.',
                  'Drizzle a little oil or ghee around the edges and a few drops on top. Rotate the pan slightly over the burner during cooking if needed to even out browning on a glass-top stove.',
                  'Cook until the edges lift and become crisp and the surface is dry and golden; do not flip. Loosen the edges with a spatula, then fold or roll the dosa directly in the pan while it is still hot and pliable, and serve immediately.'
                ]
              }
            ]
          },
          {
            id: 'potato_masala',
            name: 'Potato Masala (Dosa Filling)',
            kind: 'filling',
            ingredients: [
              {
                section: 'Masala base',
                items: [
                  {
                    name: 'Potatoes',
                    amount: 4,
                    unit: 'medium',
                    prep: 'boiled until tender, peeled, and crumbled',
                    notes: 'Yellow or white potatoes work best for a soft, cohesive filling.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'waxy potatoes',
                        ratio: '1:1',
                        notes: 'Hold shape more; lightly mash to keep the filling from being too chunky.'
                      }
                    ]
                  },
                  {
                    name: 'Onion',
                    amount: 1,
                    unit: 'small',
                    prep: 'thinly sliced',
                    notes: '',
                    optional: false,
                    substitutions: [
                      {
                        name: 'shallots',
                        ratio: '2:1 shallots:onion',
                        notes: 'Use 2 small shallots for 1 onion.'
                      }
                    ]
                  },
                  {
                    name: 'Green chili',
                    amount: 1,
                    unit: 'whole',
                    prep: 'finely chopped or slit',
                    notes: 'Adjust quantity to taste for heat.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'jalapeño or other fresh chili',
                        ratio: '1:1',
                        notes: 'Remove seeds for less heat if desired.'
                      }
                    ]
                  },
                  {
                    name: 'Ginger',
                    amount: 1,
                    unit: 'tsp',
                    prep: 'finely grated or minced',
                    notes: 'Optional but adds brightness.',
                    optional: true,
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Tempering & seasoning',
                items: [
                  {
                    name: 'Oil or ghee',
                    amount: 2,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Ghee gives classic flavour; neutral oil keeps it dairy-free.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'neutral oil',
                        ratio: '1:1',
                        notes: 'Use any neutral vegetable oil if avoiding ghee.'
                      }
                    ]
                  },
                  {
                    name: 'Mustard seeds',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Optional if you have them; adds a classic South Indian aroma.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Cumin seeds',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Turmeric powder',
                    amount: 0.75,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Gives the filling its classic yellow colour and flavour.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adjust to taste; filling should be slightly on the salty side.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Water',
                    amount: 3,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Used to loosen the masala to a spoonable consistency.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Lemon juice',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Optional finishing touch to brighten flavour.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'lime juice',
                        ratio: '1:1',
                        notes: 'Similar bright acidity.'
                      }
                    ]
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Cook and crumble potatoes',
                instructions: [
                  'Boil the potatoes in salted water until they are fully tender when pierced with a fork.',
                  'Drain, allow to cool slightly, peel, and crumble them into rustic chunks using your hands or a fork. Do not mash completely smooth; keep some small pieces for texture.'
                ]
              },
              {
                order: 2,
                title: 'Temper spices and cook onions',
                instructions: [
                  'Heat the oil or ghee in a pan over medium heat.',
                  'Add mustard seeds (if using) and let them crackle for a few seconds, then add cumin seeds and stir until fragrant.',
                  'Add the sliced onion, green chili, and ginger (if using). Cook until the onion is soft and translucent but not browned.'
                ]
              },
              {
                order: 3,
                title: 'Add turmeric, salt, and potatoes',
                instructions: [
                  'Add the turmeric and salt to the pan and stir to coat the onions evenly.',
                  'Add the crumbled potatoes and gently fold everything together until well combined and uniformly yellow.'
                ]
              },
              {
                order: 4,
                title: 'Loosen the masala and finish',
                instructions: [
                  'Add 3–4 tablespoons of water and stir over low heat until the mixture softens and becomes slightly saucy, not dry.',
                  'Lightly mash about one-third of the potatoes with the back of a spoon to help the filling hold together while keeping some small chunks for texture.',
                  'Taste and adjust salt. Add lemon juice at the end for brightness if desired.',
                  'Keep warm for stuffing dosa, or cool and reheat gently with a splash of water before serving.'
                ]
              }
            ]
          },
          {
            id: 'sambar',
            name: 'Simple Red Lentil Sambar',
            kind: 'side',
            ingredients: [
              {
                section: 'Dal and vegetables',
                items: [
                  {
                    name: 'Red lentils (masoor dal)',
                    amount: 0.5,
                    unit: 'cup',
                    prep: 'rinsed',
                    notes: 'Cooks quickly and makes a smooth, soupy base for sambar.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'toor dal',
                        ratio: '1:1',
                        notes: 'Traditional sambar; increase cooking time until completely soft.'
                      }
                    ]
                  },
                  {
                    name: 'Water',
                    amount: 2.5,
                    unit: 'cup',
                    prep: '',
                    notes: 'Adjust as needed for a pourable, soupy consistency.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Onion',
                    amount: 1,
                    unit: 'small',
                    prep: 'chopped',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Tomatoes',
                    amount: 2,
                    unit: 'medium',
                    prep: 'chopped',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Carrot or other mild vegetable',
                    amount: 1,
                    unit: 'medium',
                    prep: 'chopped',
                    notes: 'Optional but adds body and sweetness.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'potato, zucchini, or squash',
                        ratio: '1:1 by volume',
                        notes: ''
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Spices and seasoning',
                items: [
                  {
                    name: 'Turmeric powder',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground cumin',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground coriander',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Paprika or mild chili powder',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Use hotter chili powder if you prefer more heat.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Fenugreek seeds or a pinch of ground fenugreek',
                    amount: 0.13,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Use only a tiny amount; too much can turn the sambar bitter.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adjust to taste.',
                    optional: false,
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Tempering and finishing',
                items: [
                  {
                    name: 'Oil',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Use neutral oil or ghee for extra richness.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Mustard seeds',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Optional but adds classic sambar aroma.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Cumin seeds',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Dried red chili or chili flakes',
                    amount: 1,
                    unit: 'whole',
                    prep: 'left whole or broken',
                    notes: 'Use flakes if you don\'t have whole dried chilies.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Garlic clove',
                    amount: 1,
                    unit: 'clove',
                    prep: 'thinly sliced',
                    notes: '',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Lemon juice or vinegar',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Adds a bright sour note; adjust to taste.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'tamarind paste',
                        ratio: '1:1 by taste',
                        notes: 'Use a small amount diluted in water and add to the sambar at the end.'
                      }
                    ]
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Cook the lentils',
                instructions: [
                  'Combine the red lentils, water, turmeric, and salt in a pot.',
                  'Bring to a boil, then reduce to a simmer and cook for about 10–12 minutes, stirring occasionally, until the lentils are completely soft and beginning to break down.',
                  'Gently mash or whisk the lentils to create a smooth, soupy base.'
                ]
              },
              {
                order: 2,
                title: 'Add vegetables',
                instructions: [
                  'Add the chopped onion, tomatoes, and carrot or other vegetables to the pot.',
                  'Simmer for another 10–15 minutes, until the vegetables are fully cooked and the mixture has thickened slightly.',
                  'Add more water as needed to maintain a pourable, soup-like consistency.'
                ]
              },
              {
                order: 3,
                title: 'Season the sambar',
                instructions: [
                  'Stir in the ground cumin, ground coriander, paprika or chili powder, and a pinch of fenugreek if using.',
                  'Simmer for 5 more minutes to let the spices bloom and the flavours meld.',
                  'Taste and adjust salt as needed.'
                ]
              },
              {
                order: 4,
                title: 'Make the tempering',
                instructions: [
                  'In a small pan, heat the oil over medium heat.',
                  'Add mustard seeds (if using) and allow them to crackle, then add cumin seeds, dried chili or chili flakes, and sliced garlic.',
                  'Fry for 10–20 seconds, just until fragrant and the garlic lightly colours, then immediately pour the hot tempering into the sambar.'
                ]
              },
              {
                order: 5,
                title: 'Finish and adjust consistency',
                instructions: [
                  'Stir the sambar well after adding the tempering.',
                  'Turn off the heat and add lemon juice or vinegar to taste for brightness.',
                  'Thin with a bit more water if needed for an easy-pouring consistency suitable for serving alongside dosa.',
                  'Keep warm until serving.'
                ]
              }
            ]
          },
          {
            id: 'coconut_chutney',
            name: 'Coconut Chutney (Dried Coconut & Cashew Version)',
            kind: 'condiment',
            ingredients: [
              {
                section: 'Chutney base',
                items: [
                  {
                    name: 'Unsweetened medium dried coconut',
                    amount: 0.5,
                    unit: 'cup',
                    prep: '',
                    notes: 'Rehydrated to mimic fresh grated coconut.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'frozen grated coconut',
                        ratio: '1:1',
                        notes: 'Best and most authentic option; reduce or skip the hot water soak step.'
                      }
                    ]
                  },
                  {
                    name: 'Hot water',
                    amount: 0.75,
                    unit: 'cup',
                    prep: '',
                    notes: 'Used to rehydrate the dried coconut; adjust as needed when blending.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Cashews',
                    amount: 6,
                    unit: 'whole',
                    prep: '',
                    notes: 'Adds creaminess and body to make up for the dryness of desiccated coconut.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'roasted chana dal',
                        ratio: '1:1 by volume',
                        notes: 'Traditional thickener if available.'
                      }
                    ]
                  },
                  {
                    name: 'Green chili',
                    amount: 1,
                    unit: 'whole',
                    prep: 'chopped',
                    notes: 'Adjust to taste for heat.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'jalapeño or similar fresh chili',
                        ratio: '1:1',
                        notes: ''
                      }
                    ]
                  },
                  {
                    name: 'Ginger',
                    amount: 1,
                    unit: 'tsp',
                    prep: 'chopped',
                    notes: '',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adjust to taste.',
                    optional: false,
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Tempering (optional but recommended)',
                items: [
                  {
                    name: 'Oil',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Any neutral oil or a little ghee.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Mustard seeds',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Optional but adds a classic top note.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Chili flakes',
                    amount: 0.13,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Use sparingly; the chutney already has fresh chili.',
                    optional: true,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Rehydrate the dried coconut',
                instructions: [
                  'Add the dried coconut to a bowl and pour the hot water over it.',
                  'Let it soak for 10–15 minutes to fully rehydrate and soften.'
                ]
              },
              {
                order: 2,
                title: 'Blend the chutney',
                instructions: [
                  'Transfer the soaked coconut and any remaining soaking water to a blender.',
                  'Add cashews, green chili, ginger, and salt.',
                  'Blend until smooth and creamy, adding a splash more water if needed to reach a thick, spoonable consistency.',
                  'Taste and adjust salt or chili as desired.'
                ]
              },
              {
                order: 3,
                title: 'Optional tempering',
                instructions: [
                  'Just before serving, heat the oil in a small pan.',
                  'Add mustard seeds (if using) and allow them to crackle, then add a pinch of chili flakes.',
                  'Fry briefly until fragrant, then pour the hot tempering over the chutney.',
                  'Stir lightly or leave the tempered oil pooled on top for visual contrast.'
                ]
              }
            ]
          },
          {
            id: 'red_chutney',
            name: 'Tomato Red Chutney',
            kind: 'condiment',
            ingredients: [
              {
                section: 'Chutney base',
                items: [
                  {
                    name: 'Onion',
                    amount: 1,
                    unit: 'small',
                    prep: 'chopped',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Tomatoes',
                    amount: 2,
                    unit: 'medium',
                    prep: 'chopped',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Dried red chilies or chili flakes',
                    amount: 2,
                    unit: 'whole',
                    prep: 'stems removed (if whole)',
                    notes: 'Adjust quantity to taste for heat.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'red chili flakes',
                        ratio: '0.5–1 tsp for 2 chilies',
                        notes: ''
                      }
                    ]
                  },
                  {
                    name: 'Garlic cloves',
                    amount: 2,
                    unit: 'clove',
                    prep: 'peeled',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Oil',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adjust to taste.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Sugar',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Balances acidity; optional.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Lemon juice or vinegar',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Adds brightness at the end.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Paprika (optional for colour)',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Boosts red colour without adding too much heat.',
                    optional: true,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Cook the aromatics and tomatoes',
                instructions: [
                  'Heat the oil in a pan over medium heat.',
                  'Add the chopped onion, dried red chilies or chili flakes, and garlic.',
                  'Cook until the onion softens and begins to turn lightly golden.',
                  'Add the chopped tomatoes and salt, and cook until the tomatoes break down and the mixture becomes saucy, about 5–8 minutes.'
                ]
              },
              {
                order: 2,
                title: 'Blend and adjust',
                instructions: [
                  'Transfer the cooked mixture to a blender.',
                  'Add sugar, lemon juice or vinegar, and paprika if using.',
                  'Blend until completely smooth.',
                  'Taste and adjust salt, acidity, and heat as desired.',
                  'Serve slightly warm or at room temperature with dosa.'
                ]
              }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Day-before prep: soak rice and lentils for dosa',
            items: [
              { component: 'dosa_batter', step: 1 }
            ]
          },
          {
            order: 2,
            label: 'Grind dosa batter and start fermentation',
            items: [
              { component: 'dosa_batter', step: 2 },
              { component: 'dosa_batter', step: 3 },
              { component: 'dosa_batter', step: 4 },
              { component: 'dosa_batter', step: 5 }
            ]
          },
          {
            order: 3,
            label: 'On the day: cook and prepare potato masala and sambar base',
            items: [
              { component: 'potato_masala', step: 1 },
              { component: 'sambar', step: 1 },
              { component: 'sambar', step: 2 }
            ]
          },
          {
            order: 4,
            label: 'Finish sambar and keep warm',
            items: [
              { component: 'sambar', step: 3 },
              { component: 'sambar', step: 4 },
              { component: 'sambar', step: 5 }
            ]
          },
          {
            order: 5,
            label: 'Make chutneys while dosa batter finishes fermenting or warms up',
            items: [
              { component: 'coconut_chutney', step: 1 },
              { component: 'coconut_chutney', step: 2 },
              { component: 'red_chutney', step: 1 },
              { component: 'red_chutney', step: 2 }
            ]
          },
          {
            order: 6,
            label: 'Temper coconut chutney just before serving and finish potato masala',
            items: [
              { component: 'coconut_chutney', step: 3 },
              { component: 'potato_masala', step: 2 },
              { component: 'potato_masala', step: 3 },
              { component: 'potato_masala', step: 4 }
            ]
          },
          {
            order: 7,
            label: 'Adjust and prepare dosa batter for cooking',
            items: [
              { component: 'dosa_batter', step: 6 }
            ]
          },
          {
            order: 8,
            label: 'Cook dosa and serve with masala, chutneys, and sambar',
            items: [
              { component: 'dosa_batter', step: 7 }
            ]
          }
        ],
        substitution_summary: {
          dairy_free: 'Use neutral oil instead of ghee or butter in dosa cooking, potato masala, chutneys, and sambar; the rest of the recipe is naturally dairy-free.',
          vegan: 'Follow dairy-free substitutions, and avoid ghee entirely. No eggs or animal products are used otherwise, so the meal becomes fully vegan.',
          extra_rich: 'Use ghee instead of oil for cooking dosa, tempering sambar, and finishing the potato masala. Add a small knob of butter to the potato masala at the end.',
          less_bright: 'Reduce or omit the lemon juice/vinegar in the sambar, potato masala, and chutneys. Use slightly less chili and ginger for a softer flavour profile.',
          spicier: 'Increase green chili in the potato masala and coconut chutney, add extra dried red chilies or chili powder to the red chutney and sambar, and use a hotter chili variety if desired.'
        }
      },
      {
        id: 'beef-black-bean-chili',
        name: 'Beef & Black Bean Chili with Dried Chiles (Stovetop + Pressure Cooker)',
        cuisine: 'Tex-Mex',
        version: 1,
        servings: {
          count: 6,
          note: 'Hearty bowls; can stretch to 8 with extra beans or rice.'
        },
        metadata: {
          style: 'Smoky dried-chile beef chili with black beans, corn, coffee, and dark chocolate.',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: true,
            contains_dairy: false,
            contains_lentils: false
          },
          context: 'Designed for Steve’s pantry: beef shoulder roast, ground beef, dried ancho & guajillo chiles, jalapeño, Fresno, coffee, baker’s chocolate, black beans, corn. Includes both stovetop and pressure cooker methods.'
        },
        components: [
          {
            id: 'chili_stovetop',
            name: 'Dried-Chile Beef & Black Bean Chili (Stovetop Method)',
            kind: 'main',
            ingredients: [
              {
                section: 'Meat & Main Base',
                items: [
                  {
                    name: 'Beef shoulder roast, cut into 1–2 cm cubes',
                    amount: 450,
                    unit: 'g',
                    prep: 'trimmed and cubed',
                    notes: 'Roughly 1 lb; provides tender chunks.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Beef chuck roast',
                        ratio: '1:1',
                        notes: 'Any well-marbled stewing beef works similarly.'
                      }
                    ]
                  },
                  {
                    name: 'Ground beef',
                    amount: 450,
                    unit: 'g',
                    prep: '',
                    notes: 'Roughly 1 lb; adds body and richness.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Ground pork or pork/beef blend',
                        ratio: '1:1',
                        notes: 'Adds extra richness and softer texture.'
                      }
                    ]
                  },
                  {
                    name: 'Neutral oil or beef tallow',
                    amount: 2,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'For searing meat and sautéing vegetables.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Canola oil, sunflower oil, or lard',
                        ratio: '1:1',
                        notes: 'Any high-heat fat works.'
                      }
                    ]
                  },
                  {
                    name: 'Onion',
                    amount: 1,
                    unit: 'medium',
                    prep: 'finely diced',
                    notes: 'Builds sweetness and base flavour.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Leeks or shallots',
                        ratio: '1:1 by volume',
                        notes: 'Milder but still good aromatic base.'
                      }
                    ]
                  },
                  {
                    name: 'Carrots',
                    amount: 2,
                    unit: 'medium',
                    prep: 'finely diced',
                    notes: 'Adds sweetness and body, helps balance heat and bitterness.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Celery',
                        ratio: '1:1',
                        notes: 'Less sweet; can combine 1 carrot + 1 celery for balance.'
                      }
                    ]
                  },
                  {
                    name: 'Garlic cloves',
                    amount: 4,
                    unit: 'cloves',
                    prep: 'minced',
                    notes: 'Adjust to taste.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Garlic powder',
                        ratio: '1 clove : 1/4 tsp',
                        notes: 'Add with the dry spices instead of sautéing.'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Chiles, Beans & Vegetables',
                items: [
                  {
                    name: 'Dried ancho chiles',
                    amount: 2,
                    unit: 'whole',
                    prep: 'stems and most seeds removed',
                    notes: 'Provides deep, fruity, mild heat.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Dried guajillo chiles',
                    amount: 2,
                    unit: 'whole',
                    prep: 'stems and most seeds removed',
                    notes: 'Adds bright red colour and gentle heat.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Additional ancho chiles',
                        ratio: '1 guajillo : 1 ancho',
                        notes: 'Slightly less bright but still rich.'
                      }
                    ]
                  },
                  {
                    name: 'Additional hot dried chile (e.g., árbol or similar)',
                    amount: 1,
                    unit: 'whole',
                    prep: 'stems removed',
                    notes: 'Optional, for extra kick.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'Crushed red pepper flakes',
                        ratio: '1 chile : 1/4 tsp flakes',
                        notes: 'Add with dry spices.'
                      }
                    ]
                  },
                  {
                    name: 'Jalapeño',
                    amount: 1,
                    unit: 'whole',
                    prep: 'seeded for mild, finely diced',
                    notes: 'Add seeds for more heat.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Serrano pepper',
                        ratio: '1:1',
                        notes: 'Hotter; adjust quantity to taste.'
                      }
                    ]
                  },
                  {
                    name: 'Fresno chile',
                    amount: 1,
                    unit: 'whole',
                    prep: 'seeded for mild, finely diced',
                    notes: 'Adds bright sweetness and gentle heat.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Red jalapeño',
                        ratio: '1:1',
                        notes: 'Similar flavour and heat.'
                      }
                    ]
                  },
                  {
                    name: 'Cooked black beans (or 1 standard can, drained and rinsed)',
                    amount: 400,
                    unit: 'g',
                    prep: 'drained and rinsed if canned',
                    notes: 'Add near the end so they don’t break down.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Kidney beans or pinto beans',
                        ratio: '1:1',
                        notes: 'Any sturdy bean works well in chili.'
                      }
                    ]
                  },
                  {
                    name: 'Corn kernels (fresh, frozen, or canned)',
                    amount: 1,
                    unit: 'cup',
                    prep: '',
                    notes: 'Add late for sweet pops of texture.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Diced red bell pepper',
                        ratio: '1:1',
                        notes: 'Adds sweetness and colour but less pop than corn.'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Liquids & Base Seasoning',
                items: [
                  {
                    name: 'Strong brewed coffee',
                    amount: 0.5,
                    unit: 'cup',
                    prep: '',
                    notes: 'Adds depth and slight bitterness to balance sweetness.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Beef stock or water',
                        ratio: '1:1',
                        notes: 'Skip coffee if you want a cleaner, less roasty flavour.'
                      }
                    ]
                  },
                  {
                    name: 'Beef stock or water',
                    amount: 1.5,
                    unit: 'cups',
                    prep: '',
                    notes: 'Adjust during cooking to reach desired thickness.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Chicken stock',
                        ratio: '1:1',
                        notes: 'Slightly lighter but still good.'
                      }
                    ]
                  },
                  {
                    name: 'Canned crushed or diced tomatoes',
                    amount: 796,
                    unit: 'ml',
                    prep: '',
                    notes: 'Standard 28 oz / 796 ml can; provides body and acidity.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Water or stock plus extra dried chile paste',
                        ratio: '796 ml tomatoes : 1 cup liquid + 1–2 extra dried chiles',
                        notes: 'For a more Texas-style, low-tomato chili.'
                      }
                    ]
                  },
                  {
                    name: 'Worcestershire sauce',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Adds umami depth.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Baker’s chocolate or dark chocolate (70%+)',
                    amount: 15,
                    unit: 'g',
                    prep: 'chopped',
                    notes: 'About 1 square or 1 heaping tbsp; deepens colour and flavour without tasting like dessert.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Unsweetened cocoa powder',
                        ratio: '15 g chocolate : 1 tbsp cocoa',
                        notes: 'Add with the spices.'
                      }
                    ]
                  },
                  {
                    name: 'Apple cider vinegar (or other mild vinegar)',
                    amount: 1.5,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Added at the end to brighten flavours.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Lime juice',
                        ratio: '1:1',
                        notes: 'Gives a slightly fresher citrus brightness.'
                      }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'To taste, added in layers during cooking.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Freshly ground black pepper',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'To taste.',
                    optional: false,
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Spice Mix',
                items: [
                  {
                    name: 'Ground cumin',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Core chili flavour.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Smoked paprika',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adds smokiness; adjust to taste.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Regular paprika',
                        ratio: '1:1',
                        notes: 'Lacks smoke but still good for colour and mild flavour.'
                      }
                    ]
                  },
                  {
                    name: 'Ground coriander',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adds subtle citrusy note.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Dried oregano',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Mexican oregano if you have it.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground cinnamon',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Tiny amount for warmth; should not be identifiable.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Cayenne pepper or hot chili powder',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adjust to desired heat; remember dried chiles also contribute heat.',
                    optional: true,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Prepare dried chile paste',
                instructions: [
                  'Remove stems and most seeds from the dried ancho and guajillo chiles (and any additional hot dried chile if using).',
                  'Lightly toast the dried chiles in a dry skillet over medium heat, 20–30 seconds per side, until fragrant but not burnt.',
                  'Transfer the toasted chiles to a bowl and cover with very hot water. Soak for about 20 minutes until very pliable.',
                  'Reserve about 1 cup of the soaking liquid, then drain the rest.',
                  'Blend the softened chiles with 1/2 cup of the soaking liquid, 1 clove of the garlic (taken from the total), a pinch of salt, and a splash of the brewed coffee until you have a smooth, thick red paste. Add more soaking liquid as needed to blend.',
                  'Set the chile paste aside; this will be the flavour backbone of the chili.'
                ]
              },
              {
                order: 2,
                title: 'Brown the beef and build fond',
                instructions: [
                  'Pat the beef shoulder cubes dry with paper towels and season them lightly with salt.',
                  'Heat a large heavy pot or Dutch oven over medium-high heat and add the neutral oil or tallow.',
                  'Working in batches to avoid overcrowding, sear the beef cubes until deeply browned on at least 2 sides. Transfer browned cubes to a bowl.',
                  'Add the ground beef to the pot and cook, breaking it up with a spoon, until well browned and most of the moisture has evaporated. Season lightly with salt and pepper.',
                  'Transfer the browned ground beef to the bowl with the beef cubes. Leave the rendered fat and browned bits (fond) in the pot.'
                ]
              },
              {
                order: 3,
                title: 'Cook aromatics and fresh chiles',
                instructions: [
                  'Reduce heat to medium. If the pot looks dry, add a little more oil.',
                  'Add the diced onion and carrots. Cook, stirring occasionally, until softened and lightly golden, about 5–7 minutes.',
                  'Stir in the diced jalapeño and Fresno chiles and cook for another 1–2 minutes until slightly softened.',
                  'Add the remaining minced garlic and cook for 30–60 seconds until fragrant, taking care not to burn it.'
                ]
              },
              {
                order: 4,
                title: 'Bloom chile paste and spices',
                instructions: [
                  'Add the prepared dried chile paste to the pot with the vegetables.',
                  'Cook the paste, stirring, for 1–2 minutes until it darkens slightly and smells deeply aromatic.',
                  'Sprinkle in the ground cumin, smoked paprika, ground coriander, dried oregano, ground cinnamon, cayenne (if using), and a pinch of salt.',
                  'Stir and cook for another 1–2 minutes to bloom the spices in the fat, which intensifies their flavour.'
                ]
              },
              {
                order: 5,
                title: 'Deglaze and add liquids',
                instructions: [
                  'Pour in the brewed coffee to deglaze the pot, scraping up any browned bits from the bottom with a wooden spoon.',
                  'Add the beef stock or water and stir to combine.',
                  'Add the canned crushed or diced tomatoes and Worcestershire sauce (if using), stirring well.',
                  'Return the browned beef cubes and ground beef (and any accumulated juices) to the pot. Stir to incorporate everything evenly.'
                ]
              },
              {
                order: 6,
                title: 'Add chocolate and simmer low and slow',
                instructions: [
                  'Bring the mixture just up to a simmer over medium heat.',
                  'Stir in the chopped baker’s chocolate until fully melted and incorporated.',
                  'Reduce the heat to low so the chili is at a very gentle simmer. Partially cover the pot with a lid.',
                  'Simmer for 2.5 to 3 hours, stirring every 20–30 minutes, until the beef shoulder cubes are very tender and the chili has thickened. Add small splashes of water or stock if it gets too thick or starts to catch on the bottom.',
                  'Taste and adjust seasoning with salt and pepper as it cooks.'
                ]
              },
              {
                order: 7,
                title: 'Finish with beans, corn, and vinegar',
                instructions: [
                  'When the beef is tender and the chili has thickened to your liking, stir in the drained black beans and corn.',
                  'Simmer for another 10–15 minutes to warm the beans and corn through and let them absorb some flavour.',
                  'Stir in the apple cider vinegar. Taste and adjust salt, pepper, and acidity (add more vinegar or a squeeze of lime if you want more brightness).',
                  'Turn off the heat, cover the pot, and let the chili rest for 15–20 minutes before serving to allow the flavours to fully meld.',
                  'Serve hot with your preferred toppings such as cheese, sour cream, green onions, and lime wedges (toppings not included in nutrition/diet flags).'
                ]
              }
            ]
          },
          {
            id: 'chili_pressure_cooker',
            name: 'Dried-Chile Beef & Black Bean Chili (Pressure Cooker Method)',
            kind: 'main',
            ingredients: [
              {
                section: 'All ingredients',
                items: [
                  {
                    name: 'Beef shoulder roast, cut into 1–2 cm cubes',
                    amount: 450,
                    unit: 'g',
                    prep: 'trimmed and cubed',
                    notes: 'Same quantity as stovetop method.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Beef chuck roast',
                        ratio: '1:1',
                        notes: 'Any well-marbled stewing beef works similarly.'
                      }
                    ]
                  },
                  {
                    name: 'Ground beef',
                    amount: 450,
                    unit: 'g',
                    prep: '',
                    notes: 'Same quantity as stovetop method.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Ground pork or pork/beef blend',
                        ratio: '1:1',
                        notes: 'Adds extra richness and softer texture.'
                      }
                    ]
                  },
                  {
                    name: 'Neutral oil or beef tallow',
                    amount: 2,
                    unit: 'tbsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Onion',
                    amount: 1,
                    unit: 'medium',
                    prep: 'finely diced',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Carrots',
                    amount: 2,
                    unit: 'medium',
                    prep: 'finely diced',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Garlic cloves',
                    amount: 4,
                    unit: 'cloves',
                    prep: 'minced',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Dried ancho chiles',
                    amount: 2,
                    unit: 'whole',
                    prep: 'stems and most seeds removed',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Dried guajillo chiles',
                    amount: 2,
                    unit: 'whole',
                    prep: 'stems and most seeds removed',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Additional hot dried chile (e.g., árbol or similar)',
                    amount: 1,
                    unit: 'whole',
                    prep: 'stems removed',
                    notes: 'Optional, for extra heat.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Jalapeño',
                    amount: 1,
                    unit: 'whole',
                    prep: 'seeded for mild, finely diced',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Fresno chile',
                    amount: 1,
                    unit: 'whole',
                    prep: 'seeded for mild, finely diced',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Cooked black beans (or 1 standard can, drained and rinsed)',
                    amount: 400,
                    unit: 'g',
                    prep: 'drained and rinsed if canned',
                    notes: 'Will be stirred in after pressure cooking.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Corn kernels (fresh, frozen, or canned)',
                    amount: 1,
                    unit: 'cup',
                    prep: '',
                    notes: 'Will be stirred in after pressure cooking.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Strong brewed coffee',
                    amount: 0.5,
                    unit: 'cup',
                    prep: '',
                    notes: 'Used partly in chile paste and partly as deglazing liquid.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Beef stock or water',
                    amount: 1,
                    unit: 'cup',
                    prep: '',
                    notes: 'Pressure cookers need less liquid; add more later if reducing.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Canned crushed or diced tomatoes',
                    amount: 796,
                    unit: 'ml',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Worcestershire sauce',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: '',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Baker’s chocolate or dark chocolate (70%+)',
                    amount: 15,
                    unit: 'g',
                    prep: 'chopped',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Apple cider vinegar (or other mild vinegar)',
                    amount: 1.5,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Added after pressure cooking.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground cumin',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Smoked paprika',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground coriander',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Dried oregano',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground cinnamon',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Cayenne pepper or hot chili powder',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Optional, for more heat.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'To taste, added in layers.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Freshly ground black pepper',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'To taste.',
                    optional: false,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Prepare dried chile paste',
                instructions: [
                  'Prepare the dried chile paste exactly as described in the stovetop method: toast the ancho and guajillo chiles, soak in hot water, and blend with some soaking liquid, a clove of garlic, a pinch of salt, and a splash of coffee until smooth.',
                  'Set the chile paste aside for use after sautéing the aromatics.'
                ]
              },
              {
                order: 2,
                title: 'Brown the meats on sauté mode',
                instructions: [
                  'Set the pressure cooker to Sauté (High). Add the neutral oil or tallow.',
                  'Season the beef shoulder cubes lightly with salt, then brown them in batches until well seared. Transfer to a bowl.',
                  'Add the ground beef and cook, breaking it up with a spoon, until well browned and most moisture has evaporated. Season lightly with salt and pepper.',
                  'Transfer the browned ground beef to the bowl with the beef cubes, leaving the rendered fat in the pot.'
                ]
              },
              {
                order: 3,
                title: 'Sauté aromatics and bloom chile paste',
                instructions: [
                  'With the cooker still on Sauté, add the diced onion and carrots. Cook for 5–7 minutes, stirring occasionally, until softened and lightly golden.',
                  'Add the diced jalapeño and Fresno chiles; cook for 1–2 minutes.',
                  'Stir in the remaining minced garlic and cook briefly until fragrant.',
                  'Add the prepared dried chile paste and cook, stirring constantly, for 1–2 minutes to deepen its flavour.',
                  'Sprinkle in the ground cumin, smoked paprika, ground coriander, dried oregano, ground cinnamon, and cayenne (if using). Stir and cook for 1–2 more minutes to bloom the spices.'
                ]
              },
              {
                order: 4,
                title: 'Deglaze and load the pot for pressure cooking',
                instructions: [
                  'Pour in the brewed coffee and scrape the bottom of the pot thoroughly to release any browned bits and avoid a burn warning.',
                  'Add 1 cup of beef stock or water and stir well.',
                  'Stir in the canned crushed or diced tomatoes and Worcestershire sauce (if using).',
                  'Return the browned beef cubes and ground beef (and any juices) to the pot, stirring to distribute evenly.',
                  'Stir in the chopped baker’s chocolate until it begins to melt.',
                  'Check that the total liquid level is sufficient for your pressure cooker’s minimum requirements (there should be at least about 1.5–2 cups of liquid; add a bit more water or stock if needed).'
                ]
              },
              {
                order: 5,
                title: 'Pressure cook the chili',
                instructions: [
                  'Cancel the Sauté function.',
                  'Secure the lid and set the pressure cooker to High Pressure for 35–40 minutes.',
                  'Allow the cooker to come up to pressure and cook. When the time is up, let the pressure release naturally for 10–15 minutes, then manually release any remaining pressure.',
                  'Open the lid carefully. The beef shoulder should be very tender and the chili will look somewhat loose at this stage.'
                ]
              },
              {
                order: 6,
                title: 'Reduce, finish, and add beans and corn',
                instructions: [
                  'Set the cooker back to Sauté (Medium or Low) with the lid off.',
                  'Stir in the drained black beans and corn.',
                  'Simmer, stirring occasionally, for 10–20 minutes to reduce and thicken the chili to your desired consistency. If it becomes too thick, add small splashes of water or stock.',
                  'Stir in the apple cider vinegar. Taste and adjust salt, pepper, and acidity (add more vinegar or a squeeze of lime if desired).'
                ]
              },
              {
                order: 7,
                title: 'Rest and serve',
                instructions: [
                  'Turn off the cooker and let the chili rest, covered but off heat, for about 10–15 minutes to allow the flavours to meld.',
                  'Serve hot with your preferred toppings such as cheese, sour cream, green onions, and lime wedges (toppings not included in diet flags).'
                ]
              }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Stovetop workflow',
            items: [
              {
                component: 'chili_stovetop',
                step: 1
              },
              {
                component: 'chili_stovetop',
                step: 2
              },
              {
                component: 'chili_stovetop',
                step: 3
              },
              {
                component: 'chili_stovetop',
                step: 4
              },
              {
                component: 'chili_stovetop',
                step: 5
              },
              {
                component: 'chili_stovetop',
                step: 6
              },
              {
                component: 'chili_stovetop',
                step: 7
              }
            ]
          },
          {
            order: 2,
            label: 'Pressure cooker workflow',
            items: [
              {
                component: 'chili_pressure_cooker',
                step: 1
              },
              {
                component: 'chili_pressure_cooker',
                step: 2
              },
              {
                component: 'chili_pressure_cooker',
                step: 3
              },
              {
                component: 'chili_pressure_cooker',
                step: 4
              },
              {
                component: 'chili_pressure_cooker',
                step: 5
              },
              {
                component: 'chili_pressure_cooker',
                step: 6
              },
              {
                component: 'chili_pressure_cooker',
                step: 7
              }
            ]
          }
        ],
        substitution_summary: {
          dairy_free: 'Base chili is naturally dairy-free. Serve with dairy-free toppings such as avocado, sliced green onions, and lime instead of cheese or sour cream.',
          vegan: 'Replace beef shoulder and ground beef with extra beans (black, kidney, pinto) and/or a plant protein like crumbled tofu, tempeh, or TVP; use vegetable stock instead of beef stock; omit Worcestershire or use a vegan version. Cook times are shorter since there is no meat to tenderize.',
          extra_rich: 'Use a higher ratio of beef shoulder to ground beef (or add some fatty pork), sear the meat very deeply, add an extra 5–10 g of dark chocolate, and use beef stock instead of water. You can also finish with a small knob of butter or a spoonful of sour cream when serving.',
          less_bright: 'Reduce or omit the vinegar at the end and use a milder tomato product (or slightly less tomato overall). Skip lime or other acidic garnishes and emphasize richness with cheese or sour cream instead.',
          spicier: 'Keep more seeds in the dried chiles, add an extra hot dried chile (like árbol), do not seed the jalapeño and Fresno, and increase cayenne in the spice mix by 1/4–1/2 tsp. You can also serve with fresh sliced chiles on top for an extra kick.'
        }
      },
      {
        id: 'sortilege-chicken-liver-pate',
        name: 'Sortilège Chicken Liver Pâté',
        cuisine: 'Québécois',
        version: 1,
        servings: {
          count: 8,
          note: 'Approx. 8 appetizer portions'
        },
        metadata: {
          style: 'Québec-style maple whisky chicken liver pâté',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: true,
            contains_dairy: true,
            contains_lentils: false
          },
          context: 'Rich, silky chicken liver pâté made in a pan, using Sortilège maple whisky instead of brandy. Livers are cooked just to pink, then blended with butter for a smooth mousse-like texture.'
        },
        components: [
          {
            id: 'pate_main',
            name: 'Sortilège Chicken Liver Pâté',
            kind: 'core',
            ingredients: [
              {
                section: 'Livers & aromatics',
                items: [
                  {
                    name: 'chicken livers',
                    amount: 1,
                    unit: 'lb',
                    prep: 'trimmed of any green or tough connective tissue, patted very dry',
                    notes: 'Aim for dry surfaces so they sear instead of steaming.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'chicken livers (by weight in grams)',
                        ratio: '450 g for 1 lb',
                        notes: 'Use 400–500 g; texture is forgiving.'
                      }
                    ]
                  },
                  {
                    name: 'shallot',
                    amount: 1,
                    unit: 'small',
                    prep: 'finely minced',
                    notes: 'About 2–3 tbsp minced. Can use onion instead.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'yellow onion',
                        ratio: '1/2 small onion = 1 shallot',
                        notes: 'Finely chop for even cooking.'
                      }
                    ]
                  },
                  {
                    name: 'garlic cloves',
                    amount: 2,
                    unit: 'cloves',
                    prep: 'smashed or finely minced',
                    notes: 'Adjust to taste; garlic will mellow after cooking.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'fresh thyme',
                    amount: 2,
                    unit: 'sprigs',
                    prep: '',
                    notes: 'Cooked whole with the livers, stems removed before blending.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'dried thyme',
                        ratio: '1/2 tsp dried = 2 sprigs fresh',
                        notes: 'Add with aromatics at the start.'
                      }
                    ]
                  },
                  {
                    name: 'bay leaf',
                    amount: 1,
                    unit: 'leaf',
                    prep: '',
                    notes: 'Optional aromatic; remove before blending.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'unsalted butter (for sautéing)',
                    amount: 4,
                    unit: 'tbsp',
                    prep: 'cut into chunks if desired',
                    notes: 'Used to cook aromatics and livers.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'ghee',
                        ratio: '1:1',
                        notes: 'Gives a slightly nuttier flavour and higher heat tolerance.'
                      },
                      {
                        name: 'neutral oil',
                        ratio: '1:1',
                        notes: 'For dairy-reduced version; flavour will be a bit less rich.'
                      }
                    ]
                  },
                  {
                    name: 'Sortilège maple whisky',
                    amount: 0.25,
                    unit: 'cup',
                    prep: '',
                    notes: 'Deglazing liquid; reduces in pan to drive off alcohol and concentrate maple-whisky flavour.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'brandy or cognac',
                        ratio: '1:1',
                        notes: 'Classic non-maple version.'
                      },
                      {
                        name: 'bourbon + maple syrup',
                        ratio: '1/4 cup bourbon + 1–2 tsp maple syrup',
                        notes: 'Add maple syrup to taste while blending.'
                      },
                      {
                        name: 'apple cider vinegar + water',
                        ratio: '2 tbsp vinegar + 2 tbsp water',
                        notes: 'Alcohol-free; gives brightness but no whisky note.'
                      }
                    ]
                  },
                  {
                    name: 'fine salt',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Start with this; adjust to taste at blending.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'freshly ground black pepper',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adjust to taste; can add more at blending.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'ground allspice or cinnamon',
                    amount: 0.0625,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Very small pinch to gently support the maple and whisky notes.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'ground nutmeg',
                        ratio: 'pinch for pinch',
                        notes: 'Use sparingly to avoid overpowering the pâté.'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Finishing and blending',
                items: [
                  {
                    name: 'unsalted butter (for blending)',
                    amount: 0.5,
                    unit: 'cup',
                    prep: 'cold, cut into small cubes',
                    notes: 'Emulsified into the warm liver mixture for a smooth, mousse-like texture.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'salted butter',
                        ratio: '1:1',
                        notes: 'Reduce added salt slightly and adjust to taste.'
                      }
                    ]
                  },
                  {
                    name: 'heavy cream or whipping cream',
                    amount: 1.5,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Optional; adds extra silkiness and lightness.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'milk',
                        ratio: '1:1',
                        notes: 'Slightly lighter texture; not quite as rich.'
                      },
                      {
                        name: 'crème fraîche',
                        ratio: '1:1',
                        notes: 'Adds a subtle tang and extra richness.'
                      }
                    ]
                  },
                  {
                    name: 'apple cider vinegar or lemon juice',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Optional; brightens and balances the maple sweetness if desired.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'white wine vinegar',
                        ratio: '1:1',
                        notes: 'Mild acid; similar effect.'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Butter seal (optional)',
                items: [
                  {
                    name: 'unsalted butter (for sealing)',
                    amount: 3,
                    unit: 'tbsp',
                    prep: 'gently melted',
                    notes: 'Poured over the top to seal and extend fridge life.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'olive oil',
                        ratio: '1:1',
                        notes: 'Works as a seal; adds a distinct olive flavour.'
                      }
                    ]
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Prep and dry the livers',
                instructions: [
                  'Trim the chicken livers, removing any greenish spots or tough connective tissue.',
                  'Lay the livers out in a single layer on paper towel or a clean kitchen towel.',
                  'Pat them very dry on all sides, changing towels if they become soaked. Aim for dry surfaces so the livers sear instead of steaming.',
                  'Let the livers air-dry on the towel or a plate for 5–10 minutes while you prep the aromatics.'
                ]
              },
              {
                order: 2,
                title: 'Cook aromatics',
                instructions: [
                  'Finely mince the shallot and smash or mince the garlic cloves.',
                  'In a large skillet over medium heat, add the sautéing butter (4 tbsp) and let it melt and just begin to foam.',
                  'Add the shallot, garlic, thyme sprigs, bay leaf (if using), and the tiny pinch of allspice or cinnamon.',
                  'Cook, stirring occasionally, for 2–3 minutes until the shallot is softened and fragrant but not browned.'
                ]
              },
              {
                order: 3,
                title: 'Sear and cook the livers to pink',
                instructions: [
                  'Increase the heat to medium-high.',
                  'Add the dried chicken livers to the pan in a single layer, avoiding crowding. If your pan is small, cook them in two batches.',
                  'Season evenly with salt and black pepper.',
                  'Let the livers cook without moving them for about 2 minutes to develop colour, then flip and cook for another 2–3 minutes on the other side.',
                  'Check one liver by cutting it open: the centre should be uniformly pink and moist but not dark red and bloody. If still bloody, return to the pan and cook for another 30–45 seconds per side and check again.',
                  'Once the livers are just pink inside (not raw), turn off the heat briefly.'
                ]
              },
              {
                order: 4,
                title: 'Deglaze with Sortilège',
                instructions: [
                  'With the pan still hot, turn the heat back to medium and carefully pour in the Sortilège maple whisky.',
                  'Stir and scrape the bottom of the pan to dissolve any browned bits into the liquid.',
                  'Simmer the Sortilège for 30–60 seconds until the sharp alcohol smell has mostly cooked off and the liquid has slightly thickened.',
                  'Remove the thyme sprigs and bay leaf from the pan and discard.',
                  'Take the pan off the heat and let the mixture sit for 1–2 minutes so it is hot but not violently boiling when it hits the blender.'
                ]
              },
              {
                order: 5,
                title: 'Blend with cold butter and cream',
                instructions: [
                  'Transfer the hot livers, aromatics, and all pan juices into a blender or food processor.',
                  'Blend on high until the mixture is smooth.',
                  'While blending, add the cold cubed butter (1/2 cup) a few pieces at a time, allowing each addition to fully incorporate before adding more. This forms a smooth emulsion and gives the pâté its silky texture.',
                  'Add the cream (if using) and blend again until completely smooth and airy.',
                  'Taste and adjust the seasoning with additional salt and black pepper. If the Sortilège sweetness feels a bit strong, add the apple cider vinegar or lemon juice and blend again to brighten it.',
                  'For the smoothest possible texture, you can pass the blended mixture through a fine mesh sieve into a bowl or jug, pressing with a spatula.'
                ]
              },
              {
                order: 6,
                title: 'Portion, seal, and chill',
                instructions: [
                  'Pour or spoon the blended pâté into clean ramekins, jars, or a small terrine dish.',
                  'Tap each container gently on the counter to release trapped air bubbles, then smooth the surface with a spoon or spatula.',
                  'If using a butter seal, gently melt the sealing butter and let it cool slightly so it is warm and fluid but not scorching hot. Pour a thin, even layer over the top of each container to fully cover the surface.',
                  'Cover the containers (with lids or plastic wrap) and refrigerate for at least 2 hours, preferably overnight, until fully chilled and set.',
                  'Serve straight from the fridge or slightly closer to room temperature with toasted bread, crackers, pickles, or fruit preserves. Store in the fridge for 5–7 days (longer if fully sealed with butter), or freeze portions for longer storage.'
                ]
              }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Prep livers and aromatics',
            items: [
              { component: 'pate_main', step: 1 },
              { component: 'pate_main', step: 2 }
            ]
          },
          {
            order: 2,
            label: 'Cook livers and build flavour',
            items: [
              { component: 'pate_main', step: 3 },
              { component: 'pate_main', step: 4 }
            ]
          },
          {
            order: 3,
            label: 'Blend, portion, and chill',
            items: [
              { component: 'pate_main', step: 5 },
              { component: 'pate_main', step: 6 }
            ]
          }
        ],
        substitution_summary: {
          dairy_free: 'Use neutral oil or ghee (if tolerated) instead of butter for sautéing, and replace the blending butter with a mild-tasting oil (such as light olive oil or neutral vegetable oil). Skip the cream, and rely on thorough blending plus a bit of extra oil for richness. The flavour will be less buttery but still smooth and spreadable.',
          vegan: 'This specific recipe cannot be made vegan without replacing both the chicken livers and the dairy. For a vegan spread with similar richness, use sautéed mushrooms, onions, and walnuts as the base, deglaze with a splash of alcohol or vinegar, and blend with olive oil or vegan butter.',
          extra_rich: 'Increase the blending butter from 1/2 cup to 2/3 cup and use the full amount of cream (or even 2 tbsp). You can also add 1–2 tbsp crème fraîche while blending for a richer, lightly tangy profile.',
          less_bright: 'Reduce or omit the vinegar/lemon juice and use a tiny pinch (not more) of warm spice like allspice, nutmeg, or cinnamon. This leans the pâté toward a deeper, rounder, maple-forward flavour with less acidity.',
          spicier: 'Add a pinch of cayenne, Aleppo pepper, or freshly ground black pepper while cooking the aromatics, and adjust to taste at blending. You can also fold in a small amount of Dijon or grainy mustard at the end for gentle heat and complexity.'
        }
      },
      {
        id: 'khao-soi-maple-egg-noodles',
        name: 'Khao Soi with Homemade Egg Noodles, Kale, and Maple Balance',
        cuisine: 'Thai',
        version: 1,
        servings: {
          count: 3,
          note: 'Generous bowls'
        },
        metadata: {
          style: 'Northern Thai khao soi with homemade egg noodles',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: false,
            contains_dairy: false,
            contains_lentils: false
          },
          context: 'From-scratch khao soi built with homemade alkaline egg noodles, maple-balanced coconut curry broth, kale, and crispy noodle nests.'
        },
        components: [
          {
            id: 'curry_paste',
            name: 'From-scratch khao soi curry paste',
            kind: 'paste',
            ingredients: [
              {
                section: 'Curry paste aromatics and spices',
                items: [
                  {
                    name: 'Garlic cloves',
                    amount: 4,
                    unit: 'clove',
                    prep: 'peeled',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Shallot',
                    amount: 1,
                    unit: 'small',
                    prep: 'peeled and roughly chopped',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Fresh ginger',
                    amount: 1,
                    unit: 'tbsp',
                    prep: 'peeled and chopped',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground turmeric',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Or 1 inch fresh turmeric root, finely chopped',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Fresh turmeric root',
                        ratio: '1 tsp ground ≈ 1 tbsp fresh',
                        notes: 'Use finely minced fresh turmeric instead of ground.'
                      }
                    ]
                  },
                  {
                    name: 'Dried red chilies',
                    amount: 2,
                    unit: '',
                    prep: 'stems removed',
                    notes: 'For medium heat; adjust to taste.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Chili flakes',
                        ratio: '1–2 tsp per 2 dried chilies',
                        notes: 'Adjust to your heat preference.'
                      }
                    ]
                  },
                  {
                    name: 'Curry powder',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground coriander',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground cinnamon',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Ground cardamom',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adds classic khao soi perfume.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Shrimp paste',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adds funk; swap with fish sauce if preferred.',
                    optional: true,
                    substitutions: [
                      {
                        name: 'Fish sauce',
                        ratio: '1:1',
                        notes: 'Use if shrimp paste is unavailable.'
                      }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Seasons the paste.',
                    optional: false,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Prep the curry paste ingredients',
                instructions: [
                  'Peel the garlic and shallot and roughly chop the shallot.',
                  'Peel and chop the ginger (and fresh turmeric if using).',
                  'Remove stems from dried chilies. Shake out seeds for milder heat if desired.'
                ]
              },
              {
                order: 2,
                title: 'Blend the curry paste',
                instructions: [
                  'Add all paste ingredients to a small food processor or mortar.',
                  'Add a splash of neutral oil or water to help blend.',
                  'Process or pound into a thick, fairly smooth paste.',
                  'Set aside; you will use 1–2 tablespoons in the broth and can refrigerate the rest for a few days.'
                ]
              }
            ]
          },
          {
            id: 'soup_base_and_chicken',
            name: 'Khao soi coconut curry broth with chicken and kale',
            kind: 'soup',
            ingredients: [
              {
                section: 'Chicken and broth',
                items: [
                  {
                    name: 'Chicken thighs, bone-in skin-on',
                    amount: 1,
                    unit: 'lb',
                    prep: 'patted dry',
                    notes: 'About 4 medium thighs.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Boneless, skinless thighs',
                        ratio: '1:1 by weight',
                        notes: 'Simmer directly; bones/skin just add richness.'
                      }
                    ]
                  },
                  {
                    name: 'Neutral oil',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'For frying curry paste.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Prepared curry paste',
                    amount: 2,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Use the paste above; adjust 1–3 tbsp to taste.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Store-bought red curry paste',
                        ratio: '1:1',
                        notes: 'Add extra turmeric and curry powder to mimic khao soi.'
                      }
                    ]
                  },
                  {
                    name: 'Coconut milk',
                    amount: 400,
                    unit: 'ml',
                    prep: '',
                    notes: 'One full-fat can.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Chicken broth',
                    amount: 240,
                    unit: 'ml',
                    prep: '',
                    notes: 'About 1 cup; adjust for thickness.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Water + bouillon',
                        ratio: '240 ml water + 1 tsp bouillon',
                        notes: 'Use if stock is unavailable.'
                      }
                    ]
                  },
                  {
                    name: 'Soy sauce',
                    amount: 1.5,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Adds salt and colour.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Fish sauce',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Key savoury depth.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Soy sauce',
                        ratio: '1:1',
                        notes: 'Use if fish-free; flavour will be less complex.'
                      }
                    ]
                  },
                  {
                    name: 'Maple syrup',
                    amount: 2,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Start with 1 tsp; add up to 2 tsp to balance salt and spice.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Brown or palm sugar',
                        ratio: '1:1',
                        notes: 'For a more neutral sweetness.'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Finish and greens',
                items: [
                  {
                    name: 'Fresh lime juice',
                    amount: 1.5,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Adjust 1–2 tbsp to taste.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Kale',
                    amount: 2,
                    unit: 'cup',
                    prep: 'stems removed, leaves thinly sliced',
                    notes: 'Used as the main green.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Baby spinach',
                        ratio: '1:1',
                        notes: 'Stir in off heat.'
                      },
                      {
                        name: 'Pickled mustard greens',
                        ratio: '1:1 by loose volume',
                        notes: 'Traditional garnish; serve on the side.'
                      }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'Adjust to taste after soy and fish sauce.',
                    optional: true,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Fry curry paste and coat the chicken',
                instructions: [
                  'Heat the neutral oil in a medium pot over medium heat.',
                  'Add 1–2 tbsp of curry paste and fry for 1–2 minutes until fragrant.',
                  'Add the chicken thighs and turn to coat in the paste.'
                ]
              },
              {
                order: 2,
                title: 'Simmer the coconut curry broth uncovered',
                instructions: [
                  'Pour in the coconut milk and chicken broth, scraping up any paste stuck to the pot.',
                  'Add soy sauce, fish sauce, and 1 tsp maple syrup to start.',
                  'Bring to a gentle simmer, then lower heat to maintain a lazy simmer.',
                  'Simmer uncovered for 20–25 minutes, turning the chicken occasionally, until tender.'
                ]
              },
              {
                order: 3,
                title: 'Pull the chicken and finish the broth',
                instructions: [
                  'Lift chicken thighs from the pot and cool slightly.',
                  'Shred the meat, discarding bones and skin.',
                  'Return the shredded chicken to the pot.',
                  'Taste and adjust with fish sauce for salt, more maple syrup for balance, or extra broth for consistency.',
                  'Stir in fresh lime juice and keep the broth on low heat.'
                ]
              },
              {
                order: 4,
                title: 'Wilt the kale in the finished broth',
                instructions: [
                  'Add the sliced kale just before serving.',
                  'Simmer 1–2 minutes until tender but bright, then keep warm on low heat.'
                ]
              }
            ]
          },
          {
            id: 'fresh_egg_noodles',
            name: 'Homemade alkaline egg noodles (pasta machine #4)',
            kind: 'noodles',
            ingredients: [
              {
                section: 'Noodle dough',
                items: [
                  {
                    name: 'All-purpose flour',
                    amount: 200,
                    unit: 'g',
                    prep: '',
                    notes: 'About 1 heaping cup; weigh if possible.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Large eggs',
                    amount: 2,
                    unit: 'egg',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Baking soda',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adds alkalinity for chew and colour.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Baked baking soda',
                        ratio: '1:0.5',
                        notes: 'Use half as much if already baked to sodium carbonate.'
                      }
                    ]
                  },
                  {
                    name: 'Turmeric',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Optional, for a deeper yellow noodle.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Water',
                    amount: null,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Add in tiny splashes only if dough is too dry to come together.',
                    optional: true,
                    substitutions: []
                  }
                ]
              },
              {
                section: 'For rolling and dusting',
                items: [
                  {
                    name: 'Flour or cornstarch',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'Dust the dough and cut noodles generously so they never stick.',
                    optional: false,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Make and knead the noodle dough',
                instructions: [
                  'Combine the flour and salt in a mixing bowl.',
                  'Dissolve the baking soda in about 1 tsp of water, then beat it with the eggs (and turmeric, if using).',
                  'Pour the egg mixture into the flour and mix until a shaggy dough forms.',
                  'Knead on the counter for 8–10 minutes. The dough should be firm and tight like ramen dough; add water only a few drops at a time if absolutely necessary.',
                  'Wrap or cover and let rest for about 30 minutes at room temperature.'
                ]
              },
              {
                order: 2,
                title: 'Roll the dough to pasta machine setting #4',
                instructions: [
                  'Divide the rested dough into 2–3 pieces.',
                  'Flatten one piece and run it through the widest pasta machine setting a few times, folding to smooth the sheet.',
                  'Gradually reduce the thickness until you reach #4, aiming for a sheet that is thin but still sturdy.'
                ]
              },
              {
                order: 3,
                title: 'Cut and dust the noodles',
                instructions: [
                  'Run each sheet through the noodle cutter (about 3 mm width).',
                  'Dust the cut noodles generously with flour or cornstarch and gently separate with your fingers.',
                  'Hang briefly on a pasta rack or lay on a floured tray while you prep the broth and frying oil.'
                ]
              }
            ]
          },
          {
            id: 'crispy_noodle_nests',
            name: 'Crispy egg noodle nests',
            kind: 'topping',
            ingredients: [
              {
                section: 'For frying',
                items: [
                  {
                    name: 'Portion of fresh egg noodles',
                    amount: 40,
                    unit: 'g',
                    prep: 'loosely separated',
                    notes: 'Enough for three small nests (8–12 g per bowl).',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Neutral oil',
                    amount: 500,
                    unit: 'ml',
                    prep: '',
                    notes: 'Need about 3/4–1 inch depth for frying.',
                    optional: false,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Dry the noodles for frying',
                instructions: [
                  'Spread or hang a portion of the fresh noodles so air can circulate.',
                  'Let them dry for 20–30 minutes until leathery but not brittle so they puff nicely.'
                ]
              },
              {
                order: 2,
                title: 'Form small nests',
                instructions: [
                  'Gather a small loose handful of dried noodles (about 8–12 g).',
                  'Lightly coil into a loose nest without compressing.',
                  'Place the portion into a metal ladle or small wire strainer so it keeps its shape while frying.'
                ]
              },
              {
                order: 3,
                title: 'Fry the noodle nests',
                instructions: [
                  'Heat the neutral oil to about 175°C / 350°F. A single noodle should bubble vigorously.',
                  'Lower a ladle with one portion into the hot oil and fry for 10–15 seconds, gently agitating so strands separate and puff.',
                  'When lightly golden and crisp, lift out and drain on paper towel.',
                  'Repeat with remaining portions, letting the oil return to temperature between batches.'
                ]
              }
            ]
          },
          {
            id: 'noodles_and_assembly',
            name: 'Boiled noodles, garnishes, and final assembly',
            kind: 'assembly',
            ingredients: [
              {
                section: 'Boiling the noodles',
                items: [
                  {
                    name: 'Remaining fresh egg noodles',
                    amount: null,
                    unit: '',
                    prep: 'loosely floured and separated',
                    notes: 'All noodles not used for the crispy nests.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Dried egg noodles',
                        ratio: '1:1 by cooked volume',
                        notes: 'Cook according to package directions until just tender.'
                      }
                    ]
                  },
                  {
                    name: 'Water',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'For boiling the noodles.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'To season the noodle cooking water lightly.',
                    optional: true,
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Garnishes and extras',
                items: [
                  {
                    name: 'Red onion or shallot',
                    amount: 0.5,
                    unit: 'small',
                    prep: 'thinly sliced',
                    notes: 'Use as a fresh crunchy garnish.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Fresh basil leaves',
                    amount: null,
                    unit: '',
                    prep: 'small leaves left whole or larger leaves torn',
                    notes: 'Use Thai basil if possible; Italian basil also works in a pinch.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Fresh cilantro',
                    amount: null,
                    unit: '',
                    prep: 'roughly chopped',
                    notes: 'Scatter over each bowl.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Lime wedges',
                    amount: 3,
                    unit: 'wedge',
                    prep: '',
                    notes: 'Serve 1 wedge per bowl for brightness.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Chili oil or chili crisp',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'Serve on the side for extra heat.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Swiss chard chutney',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'Optional; serve a tiny spoonful on the side as a condiment.',
                    optional: true,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Boil the noodles',
                instructions: [
                  'Bring a large pot of salted water to a boil.',
                  'Add the fresh egg noodles and cook for 45–60 seconds, just until cooked through but still chewy.',
                  'Drain well and give a quick splash of hot water to rinse off excess starch if needed.',
                  'Portion the drained noodles directly into warmed serving bowls.'
                ]
              },
              {
                order: 2,
                title: 'Assemble the bowls',
                instructions: [
                  'Bring the finished broth with chicken and kale back to a gentle simmer so it is hot.',
                  'Taste and adjust with lime juice, fish sauce, or maple syrup until the balance feels right.',
                  'Ladle the hot curry broth, chicken, and kale over the noodles.',
                  'Top with a crispy noodle nest, sliced onion or shallot, basil, cilantro, and a lime wedge.',
                  'Serve immediately with chili oil and Swiss chard chutney on the side so everyone can customize heat and intensity.'
                ]
              }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Make curry paste and noodle dough',
            items: [
              { component: 'curry_paste', step: 1 },
              { component: 'curry_paste', step: 2 },
              { component: 'fresh_egg_noodles', step: 1 }
            ]
          },
          {
            order: 2,
            label: 'Roll noodles and start broth',
            items: [
              { component: 'fresh_egg_noodles', step: 2 },
              { component: 'fresh_egg_noodles', step: 3 },
              { component: 'soup_base_and_chicken', step: 1 },
              { component: 'soup_base_and_chicken', step: 2 }
            ]
          },
          {
            order: 3,
            label: 'Finish broth and prepare crispy nests',
            items: [
              { component: 'soup_base_and_chicken', step: 3 },
              { component: 'crispy_noodle_nests', step: 1 },
              { component: 'crispy_noodle_nests', step: 2 },
              { component: 'crispy_noodle_nests', step: 3 }
            ]
          },
          {
            order: 4,
            label: 'Boil noodles, wilt kale, and assemble',
            items: [
              { component: 'soup_base_and_chicken', step: 4 },
              { component: 'noodles_and_assembly', step: 1 },
              { component: 'noodles_and_assembly', step: 2 }
            ]
          }
        ],
        substitution_summary: {
          dairy_free: 'Recipe is naturally dairy-free as written; avoid butter-based garnishes.',
          vegan: 'Swap chicken for tofu or seared mushrooms, use vegetable stock, and replace fish sauce/shrimp paste with soy sauce plus a splash of mushroom or vegan fish sauce.',
          extra_rich: 'Use the full coconut milk, simmer uncovered a bit longer to concentrate, leave bones/skin in while simmering, and finish bowls with a spoon of coconut cream.',
          less_bright: 'Reduce lime juice in the broth to 1 tbsp and let diners adjust individually with lime wedges.',
          spicier: 'Increase dried chilies or chili flakes in the paste, add more paste to the broth, and serve with a bold chili oil or crisp for extra heat.'
        }
      },

      // ── RECIPE 1: La Bûche de Noël ──────────────────────────────────────────
      {
        id: 'buche-de-noel-low-sugar',
        name: 'La Bûche de Noël (Adult, Low-Sugar, Cocoa-Dusted)',
        cuisine: 'French',
        version: 1,
        servings: { count: 8, note: 'serves 6–8' },
        metadata: {
          style: 'French holiday bûche with bitter cocoa finish and barely-sweet crème légère',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: ''
        },
        components: [
          {
            id: 'sponge',
            name: 'Chocolate Sponge Cake',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: 'eggs', amount: 4, unit: 'large', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'granulated sugar', amount: 0.5, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'all-purpose flour', amount: 0.5, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'unsweetened cocoa powder', amount: 0.25, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: 1, unit: 'pinch', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Preheat oven to 350°F (175°C). Line a 10×15-inch jelly-roll pan with parchment and lightly grease. Sift together flour, cocoa powder, and salt; set aside.'] },
              { order: 2, title: 'Step 2', instructions: ['In a stand mixer or with a hand mixer, beat eggs and sugar on high speed for 5–7 minutes until pale, thick, and ribboned — mixture should hold a trail for a few seconds.'] },
              { order: 3, title: 'Step 3', instructions: ['Gently fold in the sifted dry ingredients in two additions using a wide spatula, taking care not to deflate the batter. Spread evenly in the prepared pan.'] },
              { order: 4, title: 'Step 4', instructions: ['Bake for 10–12 minutes until the cake springs back when lightly pressed and has just pulled from the edges. Immediately turn out onto a cocoa-dusted kitchen towel, peel off parchment, and roll the cake up loosely in the towel from the short end. Cool completely.'] }
            ]
          },
          {
            id: 'creme_legere',
            name: 'Vanilla Crème Légère (Low Sugar)',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: 'whole milk', amount: 1.33, unit: 'cups', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'vanilla bean', amount: 0.5, unit: 'bean', prep: 'split and scraped', notes: '', optional: false, substitutions: [] },
                  { name: 'granulated sugar', amount: 3, unit: 'tablespoons', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'cornstarch', amount: 2, unit: 'tablespoons', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'kosher salt', amount: 1, unit: 'pinch', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'egg yolks', amount: 3, unit: 'large', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'butter', amount: 1, unit: 'tablespoon', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'whipping cream', amount: 1, unit: 'cup', prep: 'softly whipped', notes: '', optional: false, substitutions: [] },
                  { name: 'brandy or cognac', amount: 0.5, unit: 'teaspoon', prep: '', notes: '', optional: true, substitutions: [] },
                  { name: 'espresso powder', amount: 0.25, unit: 'teaspoon', prep: '', notes: '', optional: true, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Split the vanilla bean and scrape seeds into the milk. Heat milk in a saucepan over medium heat until steaming. Meanwhile, whisk yolks, sugar, cornstarch, and salt in a bowl until smooth and pale.'] },
              { order: 2, title: 'Step 2', instructions: ['Slowly pour the hot milk into the yolk mixture while whisking constantly to temper. Return everything to the saucepan and cook over medium heat, stirring constantly, until the pastry cream thickens and large bubbles pop — about 2 minutes.'] },
              { order: 3, title: 'Step 3', instructions: ['Remove from heat, stir in butter (and optional brandy or espresso powder). Strain through a fine sieve if desired. Press plastic wrap directly onto the surface and refrigerate until completely cold, at least 2 hours.'] },
              { order: 4, title: 'Step 4', instructions: ['Once chilled, fold the softly whipped cream into the pastry cream in two additions until smooth and light.'] }
            ]
          },
          {
            id: 'exterior_finish',
            name: 'Brandy–Coffee Cocoa Finish',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: 'strong coffee or espresso', amount: 3, unit: 'tablespoons', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'brandy', amount: 1, unit: 'tablespoon', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'unsweetened cocoa powder', amount: null, unit: null, prep: '', notes: 'as needed for dusting', optional: false, substitutions: [] },
                  { name: 'flaky salt', amount: 1, unit: 'pinch', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Stir together coffee and brandy to make the wash. Unroll the cooled sponge, spread crème légère evenly leaving a 1-inch border. Re-roll firmly but gently. Wrap tightly and refrigerate at least 1 hour.'] },
              { order: 2, title: 'Step 2', instructions: ['Before serving, brush the exterior lightly with the coffee–brandy wash. Dust generously with unsweetened cocoa powder. Use a fork or offset spatula to draw log-bark lines along the roll. Finish with a pinch of flaky salt.'] },
              { order: 3, title: 'Step 3', instructions: ['Rest at room temperature 10–15 minutes before slicing. Use a warm sharp knife, wiping between cuts.'] }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Prepare Crème Légère Base',
            items: [
              { component: 'creme_legere', step: 1 },
              { component: 'creme_legere', step: 2 },
              { component: 'creme_legere', step: 3 }
            ]
          },
          {
            order: 2,
            label: 'Bake and Roll Sponge',
            items: [
              { component: 'sponge', step: 1 },
              { component: 'sponge', step: 2 },
              { component: 'sponge', step: 3 },
              { component: 'sponge', step: 4 }
            ]
          },
          {
            order: 3,
            label: 'Finish Crème Légère',
            items: [
              { component: 'creme_legere', step: 4 }
            ]
          },
          {
            order: 4,
            label: 'Assemble and Chill',
            items: [
              { component: 'exterior_finish', step: 1 }
            ]
          },
          {
            order: 5,
            label: 'Exterior Finish',
            items: [
              { component: 'exterior_finish', step: 2 }
            ]
          },
          {
            order: 6,
            label: 'Serve',
            items: [
              { component: 'exterior_finish', step: 3 }
            ]
          }
        ],
        substitution_summary: {}
      },

      // ── RECIPE 2: Classic French Crêpes ─────────────────────────────────────
      {
        id: 'classic-french-crepes',
        name: 'Classic French Crêpes',
        cuisine: 'French',
        version: 1,
        servings: { count: 12, note: 'makes about 12 crêpes' },
        metadata: {
          style: 'Thin, buttery French crêpes — sweet or savoury',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: ''
        },
        components: [
          {
            id: 'classic-french-crepes-component-1',
            name: 'Classic French Crêpes',
            kind: 'main',
            ingredients: [
              {
                section: 'base',
                items: [
                  { name: 'all-purpose flour', amount: 1, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'eggs', amount: 2, unit: 'large', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'milk', amount: 1.25, unit: 'cups', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'butter', amount: 2, unit: 'tablespoons', prep: '', notes: 'melted, plus more for pan', optional: false, substitutions: [] },
                  { name: 'salt', amount: 0.25, unit: 'teaspoon', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'optional_sweet',
                items: [
                  { name: 'sugar', amount: 1, unit: 'tablespoon', prep: '', notes: '', optional: true, substitutions: [] },
                  { name: 'vanilla extract', amount: 0.5, unit: 'teaspoon', prep: '', notes: '', optional: true, substitutions: [] }
                ]
              },
              {
                section: 'optional_flavoring',
                items: [
                  { name: 'brandy or rum', amount: 1, unit: 'teaspoon', prep: '', notes: 'optional but traditional', optional: true, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Mix dry ingredients', instructions: ['Whisk flour and salt together in a bowl.'] },
              { order: 2, title: 'Add eggs', instructions: ['Add eggs and whisk until a thick, smooth paste forms.'] },
              { order: 3, title: 'Incorporate milk', instructions: ['Slowly whisk in milk until the batter is smooth and very thin, similar to heavy cream.'] },
              { order: 4, title: 'Finish batter', instructions: ['Whisk in melted butter and any optional sugar, vanilla, or alcohol.'] },
              { order: 5, title: 'Rest batter', instructions: ['Let batter rest for 20–30 minutes to relax gluten and improve texture.'] },
              { order: 6, title: 'Heat pan', instructions: ['Heat pan over medium heat and lightly butter.'] },
              { order: 7, title: 'Cook crêpes', instructions: ['Pour about 1/4 cup batter into pan, swirl to coat thinly. Cook 30–45 seconds until edges lift, flip, then cook 15–20 seconds more.'] },
              { order: 8, title: 'Stack and serve', instructions: ['Transfer to a plate, stack crêpes, and repeat until batter is finished.'] }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Preparation',
            items: [
              { component: 'classic-french-crepes-component-1', step: 1 },
              { component: 'classic-french-crepes-component-1', step: 2 },
              { component: 'classic-french-crepes-component-1', step: 3 },
              { component: 'classic-french-crepes-component-1', step: 4 }
            ]
          },
          {
            order: 2,
            label: 'Resting',
            items: [
              { component: 'classic-french-crepes-component-1', step: 5 }
            ]
          },
          {
            order: 3,
            label: 'Cooking',
            items: [
              { component: 'classic-french-crepes-component-1', step: 6 },
              { component: 'classic-french-crepes-component-1', step: 7 }
            ]
          },
          {
            order: 4,
            label: 'Serving',
            items: [
              { component: 'classic-french-crepes-component-1', step: 8 }
            ]
          }
        ],
        substitution_summary: {}
      },

      // ── RECIPE 3: Crispy-Edge Fresh Pasta Lasagna ────────────────────────────
      {
        id: 'crispy-edge-fresh-pasta-lasagna',
        name: 'Crispy-Edge Fresh Pasta Lasagna with Pork, Beef & Fennel',
        cuisine: 'Italian',
        version: 1,
        servings: { count: 6, note: 'serves 6' },
        metadata: {
          style: 'Rustic Italian-style lasagna with fresh pasta sheets, pork-beef fennel ragù, ricotta layer, and béchamel',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: ''
        },
        components: [
          {
            id: 'lasagna-main',
            name: 'Crispy-Edge Fresh Pasta Lasagna',
            kind: 'main',
            ingredients: [
              {
                section: 'fresh_pasta',
                items: [
                  { name: 'fresh pasta sheets', amount: null, unit: null, prep: '', notes: '500–600g', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'meat_ragu',
                items: [
                  { name: 'ground pork', amount: 450, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'ground beef', amount: 450, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'olive oil', amount: 2, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'onion', amount: 1, unit: 'large', prep: 'finely diced', notes: '', optional: false, substitutions: [] },
                  { name: 'fennel seeds', amount: 2, unit: 'tsp', prep: 'lightly crushed', notes: '', optional: false, substitutions: [] },
                  { name: 'tomato paste', amount: 2, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'crushed tomatoes', amount: 800, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'black pepper', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'chili flakes', amount: null, unit: null, prep: '', notes: 'optional, to taste', optional: true, substitutions: [] }
                ]
              },
              {
                section: 'ricotta_layer',
                items: [
                  { name: 'whole-milk ricotta', amount: 500, unit: 'g', prep: 'well drained', notes: '', optional: false, substitutions: [] },
                  { name: 'egg', amount: 1, unit: null, prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: 1, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'black pepper', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'nutmeg', amount: 1, unit: 'pinch', prep: '', notes: 'optional', optional: true, substitutions: [] }
                ]
              },
              {
                section: 'bechamel',
                items: [
                  { name: 'butter', amount: 60, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'all-purpose flour', amount: 60, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'whole milk', amount: 750, unit: 'ml', prep: 'warm', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: 1.5, unit: 'tsp', prep: '', notes: 'or to taste', optional: false, substitutions: [] },
                  { name: 'white pepper', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'Parmigiano-Reggiano', amount: 30, unit: 'g', prep: 'grated', notes: 'optional', optional: true, substitutions: [] }
                ]
              },
              {
                section: 'cheese',
                items: [
                  { name: 'Parmigiano-Reggiano', amount: null, unit: null, prep: 'finely grated', notes: '150–200g', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'pan_prep',
                items: [
                  { name: 'butter or olive oil', amount: null, unit: null, prep: '', notes: 'for greasing pan', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Make the ragù', instructions: ['Heat olive oil in a large heavy pan over medium-high. Brown pork and beef in batches, breaking up well. Drain excess fat if needed. Add onion and cook until soft, 5–7 min. Stir in fennel seeds and tomato paste, cook 2 min. Add crushed tomatoes. Simmer uncovered 30–40 min until thick and reduced. Season well with salt, pepper, and chili flakes if using.'] },
              { order: 2, title: 'Make the ricotta mix', instructions: ['Drain ricotta through a fine sieve or cheesecloth for at least 30 min. Mix with egg, salt, pepper, and nutmeg. Set aside.'] },
              { order: 3, title: 'Make the béchamel', instructions: ['Melt butter in a saucepan over medium heat. Whisk in flour and cook 1–2 min. Gradually add warm milk, whisking constantly to avoid lumps. Cook, stirring, until thick enough to coat the back of a spoon — about 8–10 min. Season with salt and white pepper. Stir in parmesan if using.'] },
              { order: 4, title: 'Preheat and prep pan', instructions: ['Preheat oven to 400°F (200°C). Grease a 9×13-inch (23×33cm) baking dish. Spread a thin layer of béchamel on the bottom.'] },
              { order: 5, title: 'Layer', instructions: ['Layer: pasta sheet → thin ragù → ricotta dollops → béchamel → parmesan. Repeat, finishing with a final pasta sheet topped with béchamel and a generous layer of parmesan. Press edges down firmly. Bias cheese toward the edges for maximum crisp.'] },
              { order: 6, title: 'Bake', instructions: ['Cover tightly with foil and bake 25 min. Uncover and bake a further 20–25 min until the top is deeply golden and edges are crispy. For shatteringly crisp edges, switch to broil for the last 3–4 min, watching carefully.'] },
              { order: 7, title: 'Rest and slice', instructions: ['Rest uncovered for 15 min before cutting — this is critical for clean slices. Slice from corners outward.'] }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Prep Components',
            items: [
              { component: 'lasagna-main', step: 2 },
              { component: 'lasagna-main', step: 1 },
              { component: 'lasagna-main', step: 3 }
            ]
          },
          {
            order: 2,
            label: 'Assemble Lasagna',
            items: [
              { component: 'lasagna-main', step: 4 },
              { component: 'lasagna-main', step: 5 }
            ]
          },
          {
            order: 3,
            label: 'Bake for Structure',
            items: [
              { component: 'lasagna-main', step: 6 }
            ]
          },
          {
            order: 4,
            label: 'Rest & Crisp',
            items: [
              { component: 'lasagna-main', step: 7 }
            ]
          }
        ],
        substitution_summary: {}
      },

      // ── RECIPE 4: Crispy-Edge White Lasagna ──────────────────────────────────
      {
        id: 'crispy-edge-white-lasagna',
        name: 'Crispy-Edge White Lasagna with Fresh Pasta, Ricotta, Béchamel & Pork-Beef Fennel',
        cuisine: 'Italian',
        version: 1,
        servings: { count: 6, note: 'serves 6' },
        metadata: {
          style: 'White lasagna — no tomato, rich béchamel and ricotta, crispy parchmented edges',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: ''
        },
        components: [
          {
            id: 'crispy-edge-white-lasagna-component-1',
            name: 'Crispy-Edge White Lasagna with Fresh Pasta, Ricotta, Béchamel, and Pork-Beef Fennel',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: '00 flour', amount: 300, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'eggs', amount: 3, unit: 'large', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: 2, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'ground pork', amount: 400, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'ground beef', amount: 300, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'olive oil', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'fennel seed', amount: 2, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'onion', amount: 1, unit: 'small', prep: 'finely chopped', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'black pepper', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'whole-milk ricotta', amount: 500, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'egg (for ricotta)', amount: 1, unit: 'large', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'nutmeg', amount: 1, unit: 'pinch', prep: '', notes: '', optional: true, substitutions: [] },
                  { name: 'butter', amount: 70, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'all-purpose flour', amount: 70, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'whole milk', amount: 800, unit: 'ml', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'Parmigiano-Reggiano', amount: 140, unit: 'g', prep: 'finely grated', notes: '', optional: false, substitutions: [] },
                  { name: 'butter or olive oil', amount: null, unit: null, prep: '', notes: 'for pan', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Make the pasta', instructions: ['Combine flour and salt, add eggs, mix until shaggy, knead 8–10 minutes until smooth. Wrap and rest 30 minutes.'] },
              { order: 2, title: 'Roll pasta', instructions: ['Roll pasta thin (setting 6–7 on a machine). Cut into lasagna sheets and keep covered.'] },
              { order: 3, title: 'Brown the meat', instructions: ['Heat olive oil in a wide pan over medium-high heat. Add pork and beef and brown aggressively until deeply colored and dry.'] },
              { order: 4, title: 'Add aromatics', instructions: ['Add fennel seed and onion. Cook until onion is soft and all moisture has evaporated. Season with salt and pepper. Set aside.'] },
              { order: 5, title: 'Prepare ricotta', instructions: ['Drain ricotta in a sieve 30–60 minutes. Mix with egg, salt, pepper, and nutmeg until thick and spreadable.'] },
              { order: 6, title: 'Make béchamel', instructions: ['Melt butter, whisk in flour and cook 2–3 minutes. Gradually whisk in milk and simmer until thick enough to coat a spoon. Season with salt and nutmeg.'] },
              { order: 7, title: 'Preheat and prep pan', instructions: ['Heat oven to 375°F (190°C). Butter or oil pan, especially corners.'] },
              { order: 8, title: 'Base layer', instructions: ['Spread a very thin swipe of béchamel on the bottom of the pan.'] },
              { order: 9, title: 'Layer', instructions: ['Add pasta, meat, ricotta, light béchamel, Parmigiano. Repeat 3–4 times, keeping béchamel lighter at the edges.'] },
              { order: 10, title: 'Top layer', instructions: ['Top with pasta, very light béchamel, heavy Parmigiano, and a few exposed pasta corners.'] },
              { order: 11, title: 'Covered bake', instructions: ['Cover and bake 30–35 minutes.'] },
              { order: 12, title: 'Uncover and crisp', instructions: ['Uncover, raise oven to 425°F (220°C), and bake 20–30 minutes until edges are deeply browned and bubbling.'] },
              { order: 13, title: 'Rest', instructions: ['Rest uncovered 20–30 minutes before cutting.'] }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Make and rest pasta dough',
            items: [
              { component: 'crispy-edge-white-lasagna-component-1', step: 1 }
            ]
          },
          {
            order: 2,
            label: 'Brown meat mixture',
            items: [
              { component: 'crispy-edge-white-lasagna-component-1', step: 3 },
              { component: 'crispy-edge-white-lasagna-component-1', step: 4 }
            ]
          },
          {
            order: 3,
            label: 'Drain and mix ricotta',
            items: [
              { component: 'crispy-edge-white-lasagna-component-1', step: 5 }
            ]
          },
          {
            order: 4,
            label: 'Prepare béchamel',
            items: [
              { component: 'crispy-edge-white-lasagna-component-1', step: 6 }
            ]
          },
          {
            order: 5,
            label: 'Roll pasta and assemble',
            items: [
              { component: 'crispy-edge-white-lasagna-component-1', step: 2 },
              { component: 'crispy-edge-white-lasagna-component-1', step: 7 },
              { component: 'crispy-edge-white-lasagna-component-1', step: 8 },
              { component: 'crispy-edge-white-lasagna-component-1', step: 9 },
              { component: 'crispy-edge-white-lasagna-component-1', step: 10 }
            ]
          },
          {
            order: 6,
            label: 'Bake, uncover, and rest',
            items: [
              { component: 'crispy-edge-white-lasagna-component-1', step: 11 },
              { component: 'crispy-edge-white-lasagna-component-1', step: 12 },
              { component: 'crispy-edge-white-lasagna-component-1', step: 13 }
            ]
          }
        ],
        substitution_summary: {}
      },

      // ── RECIPE 5: Onionless Spaghetti with Fennel Meatballs ─────────────────
      {
        id: 'onionless-spaghetti-fennel-meatballs',
        name: 'Onionless Spaghetti with Fennel Meatballs and Tomato-Cream Sauce',
        cuisine: 'Italian',
        version: 1,
        servings: { count: 4, note: 'serves 3–4' },
        metadata: {
          style: 'Onion-free pasta — for sensitive stomachs — with fennel-forward meatballs and a silky tomato cream sauce',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: ''
        },
        components: [
          {
            id: 'fennel_meatballs',
            name: 'Fennel Meatballs',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: 'ground meat (beef/pork blend)', amount: 500, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'fennel seeds', amount: 1, unit: 'tsp', prep: 'lightly crushed', notes: '', optional: false, substitutions: [] },
                  { name: 'garlic', amount: 2, unit: 'cloves', prep: 'finely grated', notes: '', optional: false, substitutions: [] },
                  { name: 'fresh breadcrumbs', amount: 0.5, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'milk', amount: 0.25, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'egg', amount: 1, unit: 'large', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'Parmigiano-Reggiano', amount: 0.25, unit: 'cup', prep: 'grated', notes: '', optional: false, substitutions: [] },
                  { name: 'parsley or basil', amount: 2, unit: 'tbsp', prep: 'chopped', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: 0.5, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'black pepper', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'olive oil', amount: null, unit: null, prep: '', notes: 'for frying', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Soak breadcrumbs in milk for 1–2 minutes to form a panade.'] },
              { order: 2, title: 'Step 2', instructions: ['Gently mix all ingredients together until just combined.'] },
              { order: 3, title: 'Step 3', instructions: ['Roll into golf-ball-sized meatballs.'] },
              { order: 4, title: 'Step 4', instructions: ['Brown meatballs in olive oil over medium heat until well coloured.'] },
              { order: 5, title: 'Step 5', instructions: ['Remove from pan and set aside (they will finish cooking in the sauce).'] }
            ]
          },
          {
            id: 'tomato_cream_sauce',
            name: 'Onionless Tomato–Cream Sauce (from Frozen Tomatoes)',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: 'frozen tomatoes', amount: 1.5, unit: 'kg', prep: 'peeled', notes: '', optional: false, substitutions: [] },
                  { name: 'olive oil', amount: 4, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'garlic', amount: 3, unit: 'cloves', prep: 'smashed', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'basil stems', amount: null, unit: null, prep: '', notes: 'from 1 bunch', optional: false, substitutions: [] },
                  { name: 'basil leaves', amount: null, unit: null, prep: 'torn', notes: 'to taste', optional: false, substitutions: [] },
                  { name: '10% cream', amount: 0.5, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'butter', amount: 1, unit: 'tbsp', prep: '', notes: 'optional', optional: true, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Peel frozen tomatoes under warm water; rough-chop.'] },
              { order: 2, title: 'Step 2', instructions: ['Warm olive oil gently and add garlic; infuse without browning.'] },
              { order: 3, title: 'Step 3', instructions: ['Add tomatoes, salt, and basil stems.'] },
              { order: 4, title: 'Step 4', instructions: ['Simmer uncovered 30–45 minutes until reduced and spoon-coating.'] },
              { order: 5, title: 'Step 5', instructions: ['Remove garlic and basil stems.'] },
              { order: 6, title: 'Step 6', instructions: ['Lower heat and slowly stir in cream.'] },
              { order: 7, title: 'Step 7', instructions: ['Simmer gently 10–12 minutes, stirring occasionally.'] },
              { order: 8, title: 'Step 8', instructions: ['Add butter if using, then tear in basil leaves.'] },
              { order: 9, title: 'Step 9', instructions: ['Taste and adjust salt.'] }
            ]
          },
          {
            id: 'homemade_spaghetti',
            name: 'Homemade Spaghetti',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: '00 flour (or all-purpose)', amount: 200, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'eggs', amount: 2, unit: 'large', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: 1, unit: 'pinch', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Make a well with flour; add eggs and salt.'] },
              { order: 2, title: 'Step 2', instructions: ['Mix and knead until smooth and elastic (8–10 minutes).'] },
              { order: 3, title: 'Step 3', instructions: ['Cover and rest dough for 30 minutes.'] },
              { order: 4, title: 'Step 4', instructions: ['Roll dough thin and cut into spaghetti.'] },
              { order: 5, title: 'Step 5', instructions: ['Cook in heavily salted water for 2–3 minutes.'] }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Make pasta dough',
            items: [
              { component: 'homemade_spaghetti', step: 1 },
              { component: 'homemade_spaghetti', step: 2 },
              { component: 'homemade_spaghetti', step: 3 }
            ]
          },
          {
            order: 2,
            label: 'Start tomato sauce',
            items: [
              { component: 'tomato_cream_sauce', step: 1 },
              { component: 'tomato_cream_sauce', step: 2 },
              { component: 'tomato_cream_sauce', step: 3 },
              { component: 'tomato_cream_sauce', step: 4 }
            ]
          },
          {
            order: 3,
            label: 'Make and brown meatballs',
            items: [
              { component: 'fennel_meatballs', step: 1 },
              { component: 'fennel_meatballs', step: 2 },
              { component: 'fennel_meatballs', step: 3 },
              { component: 'fennel_meatballs', step: 4 },
              { component: 'fennel_meatballs', step: 5 }
            ]
          },
          {
            order: 4,
            label: 'Finish sauce and cook pasta',
            items: [
              { component: 'tomato_cream_sauce', step: 5 },
              { component: 'tomato_cream_sauce', step: 6 },
              { component: 'tomato_cream_sauce', step: 7 },
              { component: 'tomato_cream_sauce', step: 8 },
              { component: 'tomato_cream_sauce', step: 9 },
              { component: 'homemade_spaghetti', step: 4 },
              { component: 'homemade_spaghetti', step: 5 }
            ]
          }
        ],
        substitution_summary: {}
      },

      // ── RECIPE 6: Savory Crêpes with Spinach & Cheddar Béchamel ─────────────
      {
        id: 'savory-crepes-spinach-cheddar',
        name: 'Savory Crêpes with Spinach & Cheddar Béchamel',
        cuisine: 'French',
        version: 1,
        servings: { count: 4, note: 'serves 4 (2–3 crêpes each)' },
        metadata: {
          style: 'French savory crêpes filled with wilted spinach and sharp cheddar béchamel',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: ''
        },
        components: [
          {
            id: 'crepes',
            name: 'Savory Crêpes',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: 'all-purpose flour', amount: 1, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'eggs', amount: 2, unit: 'large', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'milk', amount: 1.25, unit: 'cups', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: 0.5, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'butter or neutral oil', amount: 1, unit: 'tbsp', prep: 'melted', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Whisk or blend all ingredients until smooth and lump-free.'] },
              { order: 2, title: 'Step 2', instructions: ['Rest batter for 20–30 minutes.'] },
              { order: 3, title: 'Step 3', instructions: ['Heat a lightly buttered nonstick pan over medium heat.'] },
              { order: 4, title: 'Step 4', instructions: ['Pour a thin layer of batter, swirling to coat the pan.'] },
              { order: 5, title: 'Step 5', instructions: ['Cook until just set and lightly golden, flip briefly, then remove.'] },
              { order: 6, title: 'Step 6', instructions: ['Stack cooked crêpes and keep covered.'] }
            ]
          },
          {
            id: 'spinach_filling',
            name: 'Spinach Filling',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: 'fresh spinach (or frozen, squeezed dry)', amount: 1, unit: 'lb', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'butter', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'black pepper', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'nutmeg', amount: 1, unit: 'pinch', prep: '', notes: '', optional: true, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Melt butter in a wide pan over medium heat.'] },
              { order: 2, title: 'Step 2', instructions: ['Add spinach and cook until fully wilted.'] },
              { order: 3, title: 'Step 3', instructions: ['Continue cooking until all moisture has evaporated.'] },
              { order: 4, title: 'Step 4', instructions: ['Season lightly with salt, pepper, and nutmeg if using.'] },
              { order: 5, title: 'Step 5', instructions: ['Remove from heat and let cool slightly.'] }
            ]
          },
          {
            id: 'cheddar_bechamel',
            name: 'Light Cheddar Béchamel',
            kind: 'main',
            ingredients: [
              {
                section: 'Ingredients',
                items: [
                  { name: 'butter', amount: 2, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'all-purpose flour', amount: 2, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'milk', amount: 1.5, unit: 'cups', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'mild or medium cheddar', amount: 0.75, unit: 'cup', prep: 'finely grated', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'white or black pepper', amount: null, unit: null, prep: '', notes: 'to taste', optional: false, substitutions: [] },
                  { name: 'nutmeg', amount: 1, unit: 'pinch', prep: '', notes: '', optional: true, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Melt butter in a saucepan over medium-low heat.'] },
              { order: 2, title: 'Step 2', instructions: ['Whisk in flour and cook 1–2 minutes without browning.'] },
              { order: 3, title: 'Step 3', instructions: ['Gradually whisk in milk until smooth.'] },
              { order: 4, title: 'Step 4', instructions: ['Simmer gently until sauce lightly coats a spoon.'] },
              { order: 5, title: 'Step 5', instructions: ['Remove from heat and stir in cheddar until melted.'] },
              { order: 6, title: 'Step 6', instructions: ['Season lightly with salt, pepper, and nutmeg if using.'] }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Make crêpe batter and rest',
            items: [
              { component: 'crepes', step: 1 },
              { component: 'crepes', step: 2 }
            ]
          },
          {
            order: 2,
            label: 'Wilt spinach filling',
            items: [
              { component: 'spinach_filling', step: 1 },
              { component: 'spinach_filling', step: 2 },
              { component: 'spinach_filling', step: 3 },
              { component: 'spinach_filling', step: 4 },
              { component: 'spinach_filling', step: 5 }
            ]
          },
          {
            order: 3,
            label: 'Cook crêpes',
            items: [
              { component: 'crepes', step: 3 },
              { component: 'crepes', step: 4 },
              { component: 'crepes', step: 5 },
              { component: 'crepes', step: 6 }
            ]
          },
          {
            order: 4,
            label: 'Make cheddar béchamel and assemble',
            items: [
              { component: 'cheddar_bechamel', step: 1 },
              { component: 'cheddar_bechamel', step: 2 },
              { component: 'cheddar_bechamel', step: 3 },
              { component: 'cheddar_bechamel', step: 4 },
              { component: 'cheddar_bechamel', step: 5 },
              { component: 'cheddar_bechamel', step: 6 }
            ]
          }
        ],
        substitution_summary: {}
      },

      // ── RECIPE 7: Soffritto Umami Paste ──────────────────────────────────────
      {
        id: 'soffritto-umami-paste',
        name: 'Soffritto Umami Paste',
        cuisine: 'Italian',
        version: 1,
        servings: { count: 'about 2 cups', note: 'freezes well' },
        metadata: {
          style: 'A deeply flavoured cooked vegetable paste spiked with Hatcho miso, soy, and fish sauce — use as a base for braises, soups, and sauces',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: true,
            contains_dairy: false,
            contains_lentils: false
          },
          context: ''
        },
        components: [
          {
            id: 'paste-base',
            name: 'Soffritto Umami Paste',
            kind: 'main',
            ingredients: [
              {
                section: 'vegetables',
                items: [
                  { name: 'onions', amount: 2, unit: 'large', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'carrots', amount: 2, unit: 'medium', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'celery stalks', amount: 2, unit: null, prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'garlic cloves', amount: 6, unit: null, prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'parsley', amount: 1, unit: 'small bunch', prep: '', notes: 'stems and leaves', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'umami_and_seasoning',
                items: [
                  { name: 'Hatcho miso (unpasteurized)', amount: null, unit: null, prep: '', notes: '2–3 tablespoons', optional: false, substitutions: [] },
                  { name: 'soy sauce', amount: 1, unit: 'tablespoon', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'fish sauce', amount: 1, unit: 'tablespoon', prep: '', notes: 'optional', optional: true, substitutions: [] },
                  { name: 'tomato paste', amount: 1, unit: 'tablespoon', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'salt', amount: null, unit: null, prep: '', notes: '2–3 tablespoons', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'optional_boosters',
                items: [
                  { name: 'mushrooms (fresh or rehydrated dried)', amount: 1, unit: 'cup', prep: '', notes: '', optional: true, substitutions: [] },
                  { name: 'smoked paprika', amount: 1, unit: 'teaspoon', prep: '', notes: '', optional: true, substitutions: [] },
                  { name: 'chicken scraps or roast drippings', amount: null, unit: null, prep: '', notes: 'up to 1 cup', optional: true, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Step 1', instructions: ['Roughly chop all vegetables.'] },
              { order: 2, title: 'Step 2', instructions: ['Add vegetables and salt to a food processor. Blend until a thick paste forms.'] },
              { order: 3, title: 'Step 3', instructions: ['Transfer paste to a saucepan and cook over medium-low heat for 15–20 minutes, stirring occasionally, until raw vegetable aromas are gone.'] },
              { order: 4, title: 'Step 4', instructions: ['Remove from heat and allow to cool for about 10 minutes.'] },
              { order: 5, title: 'Step 5', instructions: ['Stir in Hatcho miso, soy sauce, tomato paste, and fish sauce (do not cook the miso).'] },
              { order: 6, title: 'Step 6', instructions: ['Cool completely and transfer to clean jars or containers.'] },
              { order: 7, title: 'Step 7', instructions: ['Refrigerate or freeze for long-term storage.'] }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'Cook and Store',
            items: [
              { component: 'paste-base', step: 1 },
              { component: 'paste-base', step: 2 },
              { component: 'paste-base', step: 3 },
              { component: 'paste-base', step: 4 },
              { component: 'paste-base', step: 5 },
              { component: 'paste-base', step: 6 },
              { component: 'paste-base', step: 7 }
            ]
          }
        ],
        substitution_summary: {}
      },
      {
        id: 'einkorn-pancakes-mango-banana',
        name: 'Einkorn Pancakes with Mango Banana Topping',
        cuisine: 'Brunch',
        version: 1,
        servings: {
          count: 4,
          note: 'Makes 10–12 medium pancakes; scale batter by 1.5x for larger groups.'
        },
        metadata: {
          style: 'Fluffy ancient grain pancakes with a warm tropical fruit topping',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: 'Einkorn flour gives these pancakes a nutty, wholesome flavour and a tender crumb. The batter needs a short rest as einkorn absorbs liquid more slowly than modern wheat. The mango banana topping brings tropical brightness with very little added sugar needed.'
        },
        components: [
          {
            id: 'einkorn-pancake-batter',
            name: 'Einkorn Pancake Batter',
            kind: 'main',
            ingredients: [
              {
                section: 'Dry ingredients',
                items: [
                  {
                    name: 'Einkorn flour (all-purpose or whole grain)',
                    amount: 1.5,
                    unit: 'cup',
                    prep: '',
                    notes: 'All-purpose einkorn gives lighter pancakes; whole grain adds more flavour and a heartier texture. Do not substitute 1:1 with modern wheat flour without adjusting liquid — einkorn absorbs more.',
                    optional: false,
                    substitutions: [
                      { name: 'Whole wheat flour', ratio: '1:1 by weight', notes: 'Denser result; increase buttermilk by 2 tbsp to compensate.' },
                      { name: 'Spelt flour', ratio: '1:1', notes: 'Closest modern alternative; similar nutty flavour and slightly better gluten structure.' }
                    ]
                  },
                  { name: 'Baking powder', amount: 2, unit: 'tsp', prep: '', notes: 'Double-acting baking powder gives a reliable rise; check it is fresh for best results.', optional: false, substitutions: [] },
                  { name: 'Baking soda', amount: 0.25, unit: 'tsp', prep: '', notes: 'Reacts with the acidity in buttermilk for extra lift and a slightly tangy flavour.', optional: false, substitutions: [] },
                  { name: 'Salt', amount: 0.5, unit: 'tsp', prep: '', notes: 'Enhances all the flavours; do not skip.', optional: false, substitutions: [] },
                  {
                    name: 'Ground cardamom',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: '',
                    notes: 'Adds a warm, floral note that pairs beautifully with the mango and banana topping.',
                    optional: true,
                    substitutions: [{ name: 'Ground cinnamon', ratio: '1:1', notes: 'More familiar spice profile; also pairs well with the fruit topping.' }]
                  }
                ]
              },
              {
                section: 'Wet ingredients',
                items: [
                  {
                    name: 'Large eggs',
                    amount: 2,
                    unit: 'egg',
                    prep: 'room temperature',
                    notes: 'Room temperature eggs blend more evenly into the batter.',
                    optional: false,
                    substitutions: [{ name: 'Flax egg', ratio: '1 tbsp ground flax + 3 tbsp water per egg; rest 5 min before using', notes: 'Makes pancakes vegan; slightly denser texture but still holds together well.' }]
                  },
                  {
                    name: 'Buttermilk',
                    amount: 1.25,
                    unit: 'cup',
                    prep: '',
                    notes: 'Einkorn absorbs liquid more slowly than modern wheat; the batter will visibly thicken during the resting period. This is expected and normal.',
                    optional: false,
                    substitutions: [
                      { name: 'Milk + lemon juice', ratio: '1.25 cups milk + 1 tbsp lemon juice; stir and rest 5 min', notes: 'Quick buttermilk substitute; the curdled milk reacts with baking soda for lift.' },
                      { name: 'Oat milk or other plant milk + lemon juice', ratio: '1.25 cups plant milk + 1 tbsp lemon juice', notes: 'For dairy-free; the acidity still helps with rise even without dairy protein.' }
                    ]
                  },
                  {
                    name: 'Unsalted butter',
                    amount: 3,
                    unit: 'tbsp',
                    prep: 'melted and cooled slightly',
                    notes: 'Brown the butter first for a deeper, nutty flavour that complements the einkorn. Let it cool so it does not scramble the eggs.',
                    optional: false,
                    substitutions: [{ name: 'Neutral oil', ratio: '1:1', notes: 'Use for dairy-free; refined coconut oil adds a subtle tropical note that works well with the topping.' }]
                  },
                  {
                    name: 'Maple syrup',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Just enough in the batter to balance flavour; the topping provides most of the sweetness.',
                    optional: false,
                    substitutions: [
                      { name: 'Honey', ratio: '1:1', notes: 'Not vegan; adds a floral note.' },
                      { name: 'Cane sugar', ratio: '1 tbsp', notes: 'Add to the dry ingredients instead of the wet.' }
                    ]
                  },
                  { name: 'Vanilla extract', amount: 1, unit: 'tsp', prep: '', notes: 'Rounds out the flavour of the batter and bridges with the fruit topping.', optional: true, substitutions: [] }
                ]
              },
              {
                section: 'For cooking',
                items: [
                  {
                    name: 'Butter or neutral oil',
                    amount: null,
                    unit: '',
                    prep: '',
                    notes: 'Use a very thin layer between batches to prevent sticking; too much fat will make the pancakes greasy and prevent even browning.',
                    optional: false,
                    substitutions: [{ name: 'Ghee', ratio: '1:1', notes: 'Higher smoke point; gives a rich, nutty flavour on the crust.' }]
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Whisk dry ingredients',
                instructions: [
                  'Combine the einkorn flour, baking powder, baking soda, salt, and cardamom (if using) in a large mixing bowl.',
                  'Whisk thoroughly for 30 seconds to distribute the leaveners evenly throughout the flour.',
                  'Make a well in the centre of the dry ingredients to receive the wet mixture.'
                ]
              },
              {
                order: 2,
                title: 'Mix wet ingredients, combine, and rest',
                instructions: [
                  'In a separate bowl, whisk together the eggs, buttermilk, melted butter, maple syrup, and vanilla extract until smooth and well combined.',
                  'Pour the wet ingredients into the well of the dry ingredients.',
                  'Fold gently with a spatula just until no dry flour streaks remain. The batter will be lumpy — that is correct. Do not overmix; einkorn gluten is more delicate than modern wheat and overworking the batter will make pancakes tough and flat.',
                  'Let the batter rest uncovered for 8–10 minutes. Einkorn absorbs liquid more slowly than modern wheat, so the batter will thicken noticeably during the rest. This is normal and expected; do not add more liquid.'
                ]
              },
              {
                order: 3,
                title: 'Cook the pancakes',
                instructions: [
                  'Heat a non-stick or well-seasoned cast iron skillet or griddle over medium heat for 2–3 minutes. The pan is ready when a few drops of water flicked onto the surface sizzle and evaporate immediately.',
                  'Add a small amount of butter or oil and spread it into a very thin, even film, wiping away any excess with a folded paper towel.',
                  'Pour about 1/4 cup of batter per pancake onto the pan, spacing them apart. The batter will be thicker than regular pancake batter and may need a gentle nudge to spread slightly.',
                  'Cook until bubbles form across the surface, the edges look dry and set, and the underside is golden, about 2–3 minutes. Einkorn pancakes take slightly longer on the first side than modern wheat pancakes.',
                  'Flip gently with a wide spatula and cook for another 1–2 minutes until the underside is evenly golden and the pancake feels set in the centre when lightly pressed.',
                  'Transfer to a wire rack or oven-safe plate. To keep warm while cooking remaining batches, hold in a 100°C / 200°F oven uncovered so they stay crisp on the outside.',
                  'Re-grease the pan lightly between each batch.'
                ]
              }
            ]
          },
          {
            id: 'mango-banana-topping',
            name: 'Warm Mango Banana Topping',
            kind: 'topping',
            ingredients: [
              {
                section: 'Fruit',
                items: [
                  {
                    name: 'Ripe mango',
                    amount: 1,
                    unit: 'large',
                    prep: 'peeled and diced into 1 cm cubes',
                    notes: 'Alphonso or Ataulfo mangoes are sweetest and most aromatic. Frozen mango works well in off-season.',
                    optional: false,
                    substitutions: [
                      { name: 'Frozen mango chunks', ratio: '1:1 by volume', notes: 'Thaw slightly and drain excess liquid before using.' },
                      { name: 'Peach or nectarine', ratio: '1:1 by volume', notes: 'Works well in summer when mangoes are not at their peak.' }
                    ]
                  },
                  {
                    name: 'Ripe bananas',
                    amount: 2,
                    unit: 'medium',
                    prep: 'sliced into 1 cm rounds',
                    notes: 'The riper and more spotted the banana, the sweeter and more flavourful the topping. Avoid firm, underripe bananas.',
                    optional: false,
                    substitutions: [{ name: 'Plantain', ratio: '1:1', notes: 'Use a very ripe yellow plantain; cook 2–3 minutes longer until fully soft and caramelized.' }]
                  }
                ]
              },
              {
                section: 'Sauce and seasoning',
                items: [
                  {
                    name: 'Fresh lime juice',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'Balances the sweetness of the fruit and keeps the banana from browning. Adjust to taste.',
                    optional: false,
                    substitutions: [{ name: 'Lemon juice', ratio: '1:1', notes: 'Slightly less tropical brightness but equally effective for balance.' }]
                  },
                  { name: 'Maple syrup', amount: 1, unit: 'tbsp', prep: '', notes: 'Taste the fruit before adding — ripe mango and spotted banana may not need any sweetener at all.', optional: true, substitutions: [{ name: 'Honey', ratio: '1:1', notes: 'Not vegan; adds a floral note that pairs well with the mango.' }] },
                  { name: 'Vanilla extract', amount: 0.5, unit: 'tsp', prep: '', notes: 'Adds warmth and rounds out the fruit flavours.', optional: true, substitutions: [] },
                  { name: 'Unsalted butter', amount: 1, unit: 'tbsp', prep: '', notes: 'Creates a light glaze and a gentle caramelized note when the fruit is cooked in it. Skip for dairy-free.', optional: true, substitutions: [{ name: 'Coconut oil', ratio: '1:1', notes: 'Adds a tropical flavour; use refined for a neutral taste.' }] },
                  { name: 'Salt', amount: null, unit: '', prep: '', notes: 'Just a small pinch; amplifies the sweetness of the fruit.', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'Optional garnishes',
                items: [
                  { name: 'Fresh mint leaves', amount: null, unit: '', prep: 'torn or left whole', notes: 'Adds freshness and visual contrast; pairs especially well with the mango.', optional: true, substitutions: [] },
                  { name: 'Toasted coconut flakes', amount: null, unit: '', prep: 'lightly toasted in a dry pan until golden', notes: 'Adds a nutty crunch and reinforces the tropical profile.', optional: true, substitutions: [] },
                  { name: 'Chili flakes or Tajín', amount: null, unit: '', prep: '', notes: 'A tiny pinch over the finished topping adds heat that makes the tropical fruit flavours pop.', optional: true, substitutions: [] }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Prep the fruit',
                instructions: [
                  'Peel the mango and cut the flesh away from the pit, then dice into roughly 1 cm cubes.',
                  'Slice the bananas into 1 cm rounds.',
                  'Set both aside separately; the banana will be added to the pan first since it takes a moment longer to caramelize.'
                ]
              },
              {
                order: 2,
                title: 'Warm and glaze the topping',
                instructions: [
                  'Heat a small skillet over medium heat and add the butter or coconut oil (if using).',
                  'Once the butter foams and subsides, add the banana slices in a single layer. Cook without stirring for about 1 minute until lightly golden on the bottom.',
                  'Flip the banana slices and cook for another 30 seconds.',
                  'Add the diced mango, lime juice, maple syrup (if using), vanilla, and a pinch of salt. Stir gently and cook for 1–2 minutes until the fruit is warmed through and the juices have reduced into a light, glossy syrup.',
                  'Remove from heat. Taste and adjust with more lime juice for brightness or maple syrup for sweetness.',
                  'Spoon generously over the pancakes while still warm. Scatter mint, coconut flakes, or chili if using.'
                ]
              },
              {
                order: 3,
                title: 'Alternative: fresh uncooked topping',
                instructions: [
                  'For a fresh, no-cook version, toss the diced mango and sliced banana together with the lime juice, maple syrup (if using), vanilla, and a pinch of salt.',
                  'Taste and adjust sweetness and acidity. Let rest for 5 minutes for the flavours to meld, then spoon over the pancakes.',
                  'This version is best in summer when the fruit is very ripe and sweet.'
                ]
              }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Mix batter and let it rest', items: [{ component: 'einkorn-pancake-batter', step: 1 }, { component: 'einkorn-pancake-batter', step: 2 }] },
          { order: 2, label: 'Prep and warm the topping while batter rests', items: [{ component: 'mango-banana-topping', step: 1 }, { component: 'mango-banana-topping', step: 2 }] },
          { order: 3, label: 'Cook pancakes and serve', items: [{ component: 'einkorn-pancake-batter', step: 3 }] }
        ],
        substitution_summary: {
          dairy_free: 'Replace buttermilk with oat milk (or other plant milk) plus 1 tbsp lemon juice. Use neutral oil instead of butter in the batter and for cooking. For the topping, use coconut oil instead of butter.',
          vegan: 'Follow dairy-free substitutions and replace each egg with a flax egg (1 tbsp ground flax + 3 tbsp water, rested 5 minutes before using). The pancakes will be slightly denser but hold together well.',
          gluten_free: 'Einkorn is not gluten-free and is not suitable for celiac disease. For a gluten-free version, use a quality 1:1 GF flour blend and add 1 tsp xanthan gum if not already included. Expect a slightly different texture.',
          extra_rich: 'Brown the butter before adding it to the batter for deep nutty flavour. For the topping, add an extra knob of butter and a small splash of cream or coconut cream to create a richer caramel-like sauce around the fruit.',
          spicier: 'Add a pinch of cayenne to the dry ingredients for a subtle background heat in the pancakes. Finish the topping with a small pinch of chili flakes or Tajín for a contrast that makes the mango flavour pop.'
        }
      },
      {
        id: 'cornish-hen-au-pied-de-cochon',
        name: 'Cornish Hen — Au Pied de Cochon Style',
        cuisine: 'Québécois',
        version: 1,
        servings: {
          count: 2,
          note: 'Dinner for two. Rich, Québécois, unapologetic.'
        },
        metadata: {
          style: 'Québécois spatchcocked cornish hen with maple-cider glaze',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: 'A full Au Pied de Cochon-inspired dinner for two: quick no-knead baguette with rillettes and brie to start, spatchcocked cornish hen with compound butter and maple-cider glaze over roasted root vegetables, smashed duck fat potatoes, and an optional pan jus.'
        },
        components: [
          {
            id: 'quick-baguette',
            name: 'Quick No-Knead Baguette',
            kind: 'bread',
            ingredients: [
              {
                section: 'Dough',
                items: [
                  {
                    name: 'All-purpose flour',
                    amount: 2,
                    unit: 'cups',
                    prep: '260g',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Instant yeast',
                    amount: 1.5,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Warm water',
                    amount: 200,
                    unit: 'ml',
                    prep: 'about 110°F (¾ cup + 2 tbsp)',
                    notes: '',
                    optional: false,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Mix the dough (T-3:00)',
                instructions: [
                  'Mix flour, yeast, and salt in a bowl.',
                  'Add warm water. Stir with a wooden spoon until shaggy — don\'t knead, just combine until no dry flour remains.',
                  'Cover with a damp towel. Let rise in a warm spot for about 2 hours.'
                ]
              },
              {
                order: 2,
                title: 'Shape and bake (T-0:30 to T-0:20)',
                instructions: [
                  'Flour your counter generously. Turn the dough out.',
                  'Gently shape into a rough log about 14–16 inches long — don\'t punch it down aggressively. Rustic is the vibe.',
                  'Place on a parchment-lined baking sheet. Slash the top 3–4 times with a sharp knife.',
                  'Rest the shaped loaf for 10 minutes while the hen finishes its first roasting phase.',
                  'Place a small oven-safe dish of water on the lower rack for steam.',
                  'Bake at 425°F for 18–22 minutes until golden and hollow-sounding when tapped.',
                  'Tear into pieces and set out with rillettes, terrine, and brie — eat this standing in the kitchen with a glass of something while the hen rests.'
                ]
              }
            ]
          },
          {
            id: 'cornish-hen',
            name: 'Spatchcocked Cornish Hen with Maple-Cider Glaze',
            kind: 'main',
            ingredients: [
              {
                section: 'The hen',
                items: [
                  {
                    name: 'Cornish hen',
                    amount: 1,
                    unit: 'whole',
                    prep: '~1.5 lb',
                    notes: '',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Small whole chicken',
                        ratio: '1:1',
                        notes: 'Increase roasting time by 10–15 minutes.'
                      }
                    ]
                  }
                ]
              },
              {
                section: 'Compound butter',
                items: [
                  {
                    name: 'Unsalted butter',
                    amount: 3,
                    unit: 'tbsp',
                    prep: 'softened',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Chicken livers',
                    amount: 3,
                    unit: 'livers',
                    prep: 'seared and finely mashed',
                    notes: 'A $2 nod to foie gras — deeply worth it if you can get livers. Even 2 livers make a big difference.',
                    optional: true,
                    substitutions: []
                  },
                  {
                    name: 'Garlic cloves',
                    amount: 2,
                    unit: 'cloves',
                    prep: 'minced',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Fresh thyme',
                    amount: 1,
                    unit: 'tbsp',
                    prep: 'leaves stripped',
                    notes: '',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Dried thyme',
                        ratio: '1 tbsp fresh ≈ 1 tsp dried',
                        notes: ''
                      }
                    ]
                  },
                  {
                    name: 'Dijon mustard',
                    amount: 1,
                    unit: 'tsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: 'for the butter',
                    notes: 'Adjust to taste.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Black pepper',
                    amount: 0.125,
                    unit: 'tsp',
                    prep: 'for the butter',
                    notes: '',
                    optional: false,
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Maple-cider glaze',
                items: [
                  {
                    name: 'Maple syrup',
                    amount: 0.25,
                    unit: 'cup',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Apple cider',
                    amount: 0.25,
                    unit: 'cup',
                    prep: 'hard or soft, both work',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Cider vinegar',
                    amount: 1,
                    unit: 'tbsp',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Black pepper',
                    amount: 0.25,
                    unit: 'tsp',
                    prep: 'generous crack',
                    notes: '',
                    optional: false,
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Root veg bed',
                items: [
                  {
                    name: 'Carrots',
                    amount: 2,
                    unit: 'medium',
                    prep: 'peeled, cut into chunky 3-inch batons about ½ inch thick',
                    notes: 'Big enough that they won\'t burn under the hen.',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Parsnip',
                    amount: 1,
                    unit: 'large',
                    prep: 'peeled, cut into chunky 3-inch batons about ½ inch thick',
                    notes: '',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Turnip or celeriac',
                        ratio: '1:1 by volume',
                        notes: 'Similar earthy sweetness.'
                      }
                    ]
                  },
                  {
                    name: 'Duck fat or olive oil',
                    amount: 1,
                    unit: 'tbsp',
                    prep: 'for tossing the veg',
                    notes: '',
                    optional: false,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Make the compound butter (T-2:00)',
                instructions: [
                  'If using chicken livers: heat a small pan over high heat with a knob of butter. Sear the livers hard, 1–2 minutes per side — they should still be pink inside. Let cool, then mince very finely and mash with a fork.',
                  'Mix softened butter with the mashed livers (or skip), garlic, thyme, Dijon, salt, and pepper. Combine until smooth.',
                  'Set aside at room temperature.'
                ]
              },
              {
                order: 2,
                title: 'Spatchcock the hen (T-2:00)',
                instructions: [
                  'Place hen breast-side down. Using kitchen shears, cut along both sides of the backbone and remove it. Save it for stock if you want.',
                  'Flip the hen breast-side up and press down firmly on the breastbone until it cracks flat.',
                  'Gently loosen the skin over the breasts and thighs with your fingers. Spread about ⅔ of the compound butter under the skin, directly on the meat.',
                  'Spread the remaining ⅓ on top of the skin.',
                  'Season generously with salt and pepper.'
                ]
              },
              {
                order: 3,
                title: 'Make the maple-cider glaze (T-2:00)',
                instructions: [
                  'Combine maple syrup, apple cider, cider vinegar, and a generous crack of black pepper in a small saucepan.',
                  'Bring to a boil, then reduce heat and simmer until reduced by about half — it should coat the back of a spoon, about 5–7 minutes.',
                  'Set aside. It will thicken more as it cools.'
                ]
              },
              {
                order: 4,
                title: 'Roast the hen (T-1:00)',
                instructions: [
                  'Preheat oven to 425°F.',
                  'Toss the root veg batons with duck fat or olive oil, salt, and pepper. Scatter in a single layer in a cast iron skillet or roasting pan.',
                  'Place the spatchcocked hen skin-side up directly on top of the vegetables.',
                  'Put the hen AND the smashed potatoes (on their sheet pan) into the oven at the same time.',
                  'Roast undisturbed for 30 minutes.'
                ]
              },
              {
                order: 5,
                title: 'Glaze and finish (T-0:25)',
                instructions: [
                  'After 30 minutes, pull the hen out.',
                  'Brush generously with the maple-cider glaze — skin, legs, all of it.',
                  'Return to the oven for 10–12 more minutes, until the skin is deeply bronzed and lacquered and the thigh registers 165°F on a thermometer.',
                  'If the potatoes are golden and crispy, pull them now.',
                  'Transfer the hen to a cutting board to rest. Remove the root veg to a serving dish.'
                ]
              }
            ]
          },
          {
            id: 'smashed-duck-fat-potatoes',
            name: 'Smashed Duck Fat Potatoes',
            kind: 'side',
            ingredients: [
              {
                section: 'Potatoes',
                items: [
                  {
                    name: 'Yellow potatoes',
                    amount: 1,
                    unit: 'lb',
                    prep: 'small-to-medium sized, whole',
                    notes: '',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Yukon Gold potatoes',
                        ratio: '1:1',
                        notes: 'Same family, equally good.'
                      }
                    ]
                  },
                  {
                    name: 'Duck fat',
                    amount: 3,
                    unit: 'tbsp',
                    prep: '',
                    notes: 'A small jar goes a long way and transforms the texture.',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Butter or olive oil',
                        ratio: '1:1',
                        notes: 'Good but not the same — duck fat is the move here.'
                      }
                    ]
                  },
                  {
                    name: 'Flaky salt',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: 'to finish',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Fresh thyme or parsley',
                    amount: 1,
                    unit: 'tbsp',
                    prep: 'to finish',
                    notes: '',
                    optional: true,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Boil and smash (T-1:15)',
                instructions: [
                  'Boil potatoes whole in well-salted water until fork-tender, about 15–20 minutes.',
                  'Drain. Let them steam-dry for a minute.',
                  'On a sheet pan, smash each potato with the bottom of a glass or measuring cup until about ½ inch thick. They should be cracked and craggy — that\'s where the crunch happens.',
                  'Spoon duck fat over each one. Season with salt and pepper.',
                  'Set aside until the hen is ready to go in.'
                ]
              },
              {
                order: 2,
                title: 'Roast until crispy (T-1:00)',
                instructions: [
                  'Put the sheet pan of potatoes into the 425°F oven at the same time as the hen.',
                  'Roast until the edges are golden and deeply crispy, about 35–40 minutes total.',
                  'If golden before the hen finishes glazing, pull them and keep warm.',
                  'Finish with flaky salt and fresh herbs.'
                ]
              }
            ]
          },
          {
            id: 'pan-jus',
            name: 'Pan Jus',
            kind: 'sauce',
            ingredients: [
              {
                section: 'Jus',
                items: [
                  {
                    name: 'Apple cider',
                    amount: 0.5,
                    unit: 'cup',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: []
                  },
                  {
                    name: 'Chicken stock',
                    amount: 0.5,
                    unit: 'cup',
                    prep: '',
                    notes: '',
                    optional: false,
                    substitutions: [
                      {
                        name: 'Water',
                        ratio: '1:1',
                        notes: 'Lighter but still picks up all the fond.'
                      }
                    ]
                  },
                  {
                    name: 'Tomato paste',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: '',
                    notes: 'For depth and colour.',
                    optional: true,
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Build the jus (T-0:05)',
                instructions: [
                  'Transfer the rested hen to a cutting board. Remove the root veg to a serving dish.',
                  'Place the roasting pan on the stove over medium heat.',
                  'Stir in tomato paste if using.',
                  'Add the apple cider and chicken stock. Scrape up all the fond from the bottom of the pan.',
                  'Let reduce by half, about 3–4 minutes.',
                  'Strain or serve as-is. Season with salt.',
                  'Halve the hen straight down the middle for two portions. Plate over the roasted carrots and parsnip, pile the smashed potatoes alongside, and spoon the jus over everything.'
                ]
              }
            ]
          }
        ],
        workflow: [
          {
            order: 1,
            label: 'T-3:00 — Mix baguette dough',
            items: [
              { component: 'quick-baguette', step: 1 }
            ]
          },
          {
            order: 2,
            label: 'T-2:00 — Compound butter, spatchcock, glaze',
            items: [
              { component: 'cornish-hen', step: 1 },
              { component: 'cornish-hen', step: 2 },
              { component: 'cornish-hen', step: 3 }
            ]
          },
          {
            order: 3,
            label: 'T-1:15 — Boil and smash potatoes',
            items: [
              { component: 'smashed-duck-fat-potatoes', step: 1 }
            ]
          },
          {
            order: 4,
            label: 'T-1:00 — Hen and potatoes in the oven',
            items: [
              { component: 'cornish-hen', step: 4 },
              { component: 'smashed-duck-fat-potatoes', step: 2 }
            ]
          },
          {
            order: 5,
            label: 'T-0:30 — Shape and rest the baguette',
            items: [
              { component: 'quick-baguette', step: 2 }
            ]
          },
          {
            order: 6,
            label: 'T-0:25 — Glaze the hen, baguette in the oven',
            items: [
              { component: 'cornish-hen', step: 5 }
            ]
          },
          {
            order: 7,
            label: 'Serve — Jus while hen rests, then plate',
            items: [
              { component: 'pan-jus', step: 1 }
            ]
          }
        ],
        substitution_summary: {
          no_livers: 'Skip the chicken livers in the compound butter — plain garlic-thyme-Dijon butter is still excellent. The liver adds a foie-gras-adjacent richness, but the maple-cider glaze carries the dish on its own.',
          no_duck_fat: 'Use butter or olive oil for the smashed potatoes. You\'ll still get good crunch, just not quite the same depth. Duck fat is cheap, keeps for months in the fridge, and is worth keeping on hand.',
          gluten_free: 'Skip the baguette or use a gluten-free flour blend for the dough. The hen, potatoes, and jus are naturally gluten-free.',
          non_alcoholic_cider: 'Use fresh-pressed or non-alcoholic apple cider for the glaze and jus. The result is just as good — the cider is there for brightness and body, not booze.',
          extra_rich: 'Brown the compound butter before mixing, add a splash of cream to the jus, and drizzle a little extra maple syrup over the plated potatoes. This is an Au Pied de Cochon tribute — lean in.'
        }
      },
      {
        id: 'spinach-leek-soup',
        name: 'Spinach & Leek Soup',
        cuisine: 'French',
        version: 1,
        servings: {
          count: 4,
          note: 'Starter portion. Make ahead and reheat gently — add a splash of stock if too thick.'
        },
        metadata: {
          style: 'smooth spring green soup with crème fraîche and fried capers',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: true,
            contains_dairy: true,
            contains_lentils: false
          },
          context: 'Easter lunch starter.'
        },
        components: [
          {
            id: 'soup',
            name: 'Soup',
            kind: 'soup',
            ingredients: [
              {
                section: 'Soup',
                items: [
                  {
                    name: 'Butter',
                    amount: 2,
                    unit: 'tbsp',
                    substitutions: [
                      { name: 'Olive oil', ratio: '1:1', notes: 'Dairy-free option.' }
                    ]
                  },
                  {
                    name: 'Leeks, white and light green parts',
                    amount: 2,
                    unit: 'large',
                    prep: 'sliced',
                    substitutions: []
                  },
                  {
                    name: 'Garlic',
                    amount: 2,
                    unit: 'cloves',
                    prep: 'minced',
                    substitutions: []
                  },
                  {
                    name: 'Chicken or vegetable stock',
                    amount: 750,
                    unit: 'ml',
                    substitutions: [
                      { name: 'Vegetable stock', ratio: '1:1', notes: 'For vegetarian/vegan version.' }
                    ]
                  },
                  {
                    name: 'Baby spinach',
                    amount: 150,
                    unit: 'g',
                    substitutions: []
                  },
                  {
                    name: 'Heavy cream',
                    amount: 150,
                    unit: 'ml',
                    substitutions: [
                      { name: 'Coconut cream', ratio: '1:1', notes: 'Dairy-free; mild coconut note.' },
                      { name: 'Crème fraîche', ratio: '1:1', notes: 'Tangier, slightly thicker.' }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: 1,
                    unit: 'tsp',
                    prep: 'plus more to taste',
                    substitutions: []
                  }
                ]
              },
              {
                section: 'To serve',
                items: [
                  {
                    name: 'Crème fraîche',
                    amount: 4,
                    unit: 'tbsp',
                    prep: 'for swirling on top',
                    substitutions: []
                  },
                  {
                    name: 'Capers',
                    amount: 2,
                    unit: 'tbsp',
                    prep: 'fried in neutral oil until crisp and golden',
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Sweat aromatics',
                instructions: [
                  'Melt butter in a large pot over medium heat.',
                  'Add leeks and garlic, season with salt, and sweat gently for 10 minutes until completely soft. Don\'t rush this — it builds the soup\'s sweetness.'
                ]
              },
              {
                order: 2,
                title: 'Simmer stock',
                instructions: [
                  'Add stock and bring to a simmer. Cook for 10 minutes.'
                ]
              },
              {
                order: 3,
                title: 'Add spinach and blend',
                instructions: [
                  'Add spinach and stir until wilted, about 2 minutes.',
                  'Blend until very smooth — a high-powered blender gives the best colour and texture.',
                  'Stir in cream. Taste and adjust seasoning.',
                  'The soup should be vivid green. Serve right away or cool and refrigerate. Reheat gently — don\'t boil or it loses its colour.'
                ]
              },
              {
                order: 4,
                title: 'Fry capers and serve',
                instructions: [
                  'Fry capers in a little neutral oil over medium-high heat until they burst and turn golden, about 2–3 minutes. Drain on paper towel.',
                  'Serve soup with a swirl of crème fraîche and a small pile of crispy capers on top.'
                ]
              }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Sweat leeks and garlic (10 min)', items: [{ component: 'soup', step: 1 }] },
          { order: 2, label: 'Simmer stock (10 min)', items: [{ component: 'soup', step: 2 }] },
          { order: 3, label: 'Wilt spinach, blend, finish with cream', items: [{ component: 'soup', step: 3 }] },
          { order: 4, label: 'Fry capers and serve', items: [{ component: 'soup', step: 4 }] }
        ],
        substitution_summary: {
          dairy_free: 'Replace butter with olive oil, cream with coconut cream, and skip the crème fraîche or use a dairy-free alternative.',
          vegan: 'Use vegetable stock, olive oil instead of butter, and plant-based cream. Skip crème fraîche.'
        }
      },
      {
        id: 'hot-cross-buns',
        name: 'Hot Cross Buns',
        cuisine: 'British',
        version: 1,
        servings: {
          count: 12,
          note: 'Makes 12 buns. Best served warm.'
        },
        metadata: {
          style: 'spiced enriched yeasted buns with dried fruit and honey glaze',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: 'Easter bread. Bake same day or reheat briefly.'
        },
        components: [
          {
            id: 'buns',
            name: 'Hot Cross Buns',
            kind: 'bread',
            ingredients: [
              {
                section: 'Dough',
                items: [
                  {
                    name: 'All-purpose flour',
                    amount: 500,
                    unit: 'g',
                    substitutions: [
                      { name: 'Bread flour', ratio: '1:1', notes: 'Slightly chewier result.' }
                    ]
                  },
                  {
                    name: 'Instant yeast',
                    amount: 7,
                    unit: 'g',
                    notes: '1 standard sachet.',
                    substitutions: [
                      { name: 'Active dry yeast', ratio: '1:1', notes: 'Dissolve in warm milk first before adding.' }
                    ]
                  },
                  {
                    name: 'Sugar',
                    amount: 50,
                    unit: 'g',
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: 1,
                    unit: 'tsp',
                    substitutions: []
                  },
                  {
                    name: 'Cinnamon',
                    amount: 1,
                    unit: 'tsp',
                    substitutions: []
                  },
                  {
                    name: 'Mixed spice or allspice',
                    amount: 0.5,
                    unit: 'tsp',
                    substitutions: []
                  },
                  {
                    name: 'Nutmeg',
                    amount: 0.5,
                    unit: 'tsp',
                    substitutions: []
                  },
                  {
                    name: 'Butter',
                    amount: 75,
                    unit: 'g',
                    prep: 'softened',
                    substitutions: []
                  },
                  {
                    name: 'Warm milk',
                    amount: 250,
                    unit: 'ml',
                    substitutions: [
                      { name: 'Oat milk', ratio: '1:1', notes: 'Works well for dairy-free.' }
                    ]
                  },
                  {
                    name: 'Egg',
                    amount: 1,
                    unit: 'large',
                    substitutions: []
                  },
                  {
                    name: 'Mixed dried fruit (currants, raisins, mixed peel)',
                    amount: 150,
                    unit: 'g',
                    substitutions: []
                  },
                  {
                    name: 'Orange zest',
                    amount: 1,
                    unit: 'orange',
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Crosses',
                items: [
                  {
                    name: 'All-purpose flour',
                    amount: 75,
                    unit: 'g',
                    substitutions: []
                  },
                  {
                    name: 'Water',
                    amount: 6,
                    unit: 'tbsp',
                    notes: '5–6 tbsp, add until a thick pipeable paste forms.',
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Glaze',
                items: [
                  {
                    name: 'Honey or maple syrup',
                    amount: 3,
                    unit: 'tbsp',
                    prep: 'warmed',
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Make dough',
                instructions: [
                  'Combine flour, yeast, sugar, salt, and spices in a large bowl. Rub in softened butter until the mixture resembles breadcrumbs.',
                  'Add warm milk and egg. Mix to a soft dough.'
                ]
              },
              {
                order: 2,
                title: 'Knead and first rise',
                instructions: [
                  'Knead 8–10 minutes by hand (or 5–6 minutes in a stand mixer) until smooth and elastic.',
                  'Fold in dried fruit and orange zest.',
                  'Cover and let rise 1–1.5 hours until doubled in size.'
                ]
              },
              {
                order: 3,
                title: 'Shape and second prove',
                instructions: [
                  'Divide dough into 12 equal pieces. Shape each into a smooth ball.',
                  'Place in a greased 9×13 baking dish, sides touching.',
                  'Cover and prove 45 minutes until puffed and filling the dish.'
                ]
              },
              {
                order: 4,
                title: 'Pipe crosses and bake',
                instructions: [
                  'Preheat oven to 375°F (190°C).',
                  'Mix flour and water to a thick, pipeable paste. Pipe crosses over the buns using a piping bag or zip-lock with a corner snipped.',
                  'Bake 20–22 minutes until deep golden brown.'
                ]
              },
              {
                order: 5,
                title: 'Glaze',
                instructions: [
                  'Brush immediately with warmed honey or maple syrup while still hot.',
                  'Cool slightly before serving. Best eaten warm.'
                ]
              }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Mix dough and knead (15 min)', items: [{ component: 'buns', step: 1 }, { component: 'buns', step: 2 }] },
          { order: 2, label: 'First rise (1–1.5 hrs)', items: [] },
          { order: 3, label: 'Shape and second prove (45 min)', items: [{ component: 'buns', step: 3 }] },
          { order: 4, label: 'Pipe crosses and bake (20–22 min)', items: [{ component: 'buns', step: 4 }] },
          { order: 5, label: 'Glaze and cool', items: [{ component: 'buns', step: 5 }] }
        ],
        substitution_summary: {
          dairy_free: 'Replace butter with dairy-free spread and use oat milk instead of dairy milk.',
          less_sweet: 'Reduce sugar to 30g and use a light honey glaze. The dried fruit provides plenty of sweetness.',
          extra_spiced: 'Double the cinnamon and add 1/4 tsp ground cloves and 1/4 tsp ground cardamom.'
        }
      },
      {
        id: 'cider-elderflower-glazed-pork',
        name: 'Cider & Elderflower Glazed Pork',
        cuisine: 'British',
        version: 1,
        servings: {
          count: 4,
          note: 'A 4–5 lb joint serves 4 generously.'
        },
        metadata: {
          style: 'slow-roasted pork with a lacquered cider and elderflower glaze',
          diet: {
            vegetarian: false,
            vegan: false,
            gluten_free: true,
            contains_dairy: false,
            contains_lentils: false
          },
          context: 'Easter lunch centrepiece. The porchetta variation (pork belly, rolled and tied) is noted in the steps.'
        },
        components: [
          {
            id: 'pork',
            name: 'Glazed Pork',
            kind: 'roast',
            ingredients: [
              {
                section: 'Pork',
                items: [
                  {
                    name: 'Bone-in pork leg or shoulder',
                    amount: 4,
                    unit: 'lb',
                    prep: 'skin scored in a crosshatch pattern',
                    notes: '4–5 lb joint. Remove from fridge 1 hour before cooking.',
                    substitutions: [
                      { name: 'Pork belly (for porchetta)', ratio: '1:1 by weight', notes: 'See porchetta variation in step notes.' }
                    ]
                  },
                  {
                    name: 'Neutral oil',
                    amount: 2,
                    unit: 'tbsp',
                    substitutions: []
                  },
                  {
                    name: 'Salt',
                    amount: 2,
                    unit: 'tsp',
                    prep: 'worked into the scored fat generously',
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Glaze',
                items: [
                  {
                    name: 'Dry sparkling cider',
                    amount: 250,
                    unit: 'ml',
                    substitutions: [
                      { name: 'Non-alcoholic sparkling cider', ratio: '1:1', notes: 'Works perfectly.' }
                    ]
                  },
                  {
                    name: 'Elderflower cordial',
                    amount: 3,
                    unit: 'tbsp',
                    substitutions: [
                      { name: 'Apple juice concentrate', ratio: '1:1', notes: 'Less floral but still good.' }
                    ]
                  },
                  {
                    name: 'Grainy Dijon mustard',
                    amount: 2,
                    unit: 'tbsp',
                    substitutions: [
                      { name: 'Smooth Dijon', ratio: '1:1' }
                    ]
                  },
                  {
                    name: 'Maple syrup',
                    amount: 2,
                    unit: 'tbsp',
                    substitutions: [
                      { name: 'Honey', ratio: '1:1' }
                    ]
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Prep and start roasting',
                instructions: [
                  'Remove pork from fridge 1 hour before cooking. Pat dry thoroughly.',
                  'Rub all over with oil and salt generously, working salt into the scored fat.',
                  'Preheat oven to 325°F (165°C). Place pork fat-side up in a roasting pan.',
                  'Roast uncovered for 2.5–3 hours until internal temperature reaches 160°F (71°C).'
                ]
              },
              {
                order: 2,
                title: 'Make glaze',
                instructions: [
                  'Combine cider, elderflower cordial, mustard, and maple syrup in a small saucepan.',
                  'Simmer over medium heat for 10–15 minutes, stirring occasionally, until reduced by half and slightly syrupy.'
                ]
              },
              {
                order: 3,
                title: 'Glaze and finish',
                instructions: [
                  'In the last 45 minutes of cooking, raise oven temperature to 400°F (200°C).',
                  'Brush glaze over the pork every 15 minutes, 3 times total, until the surface is lacquered and deep amber.',
                  'Porchetta variation: lay pork belly flat, skin-side down. Spread with minced garlic, fennel seed, rosemary, lemon zest, salt and pepper. Roll tightly and tie with kitchen twine. Roast at 325°F for 2 hours then 450°F for final 30 minutes for crackling. Apply glaze in last 20 minutes.'
                ]
              },
              {
                order: 4,
                title: 'Rest and carve',
                instructions: [
                  'Rest 20 minutes before carving. This is not optional — the juices need time to redistribute.'
                ]
              }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Prep pork and start low roast (2.5–3 hrs)', items: [{ component: 'pork', step: 1 }] },
          { order: 2, label: 'Make glaze while pork roasts', items: [{ component: 'pork', step: 2 }] },
          { order: 3, label: 'Raise heat and glaze 3× (last 45 min)', items: [{ component: 'pork', step: 3 }] },
          { order: 4, label: 'Rest 20 min before carving', items: [{ component: 'pork', step: 4 }] }
        ],
        substitution_summary: {
          no_elderflower: 'Replace elderflower cordial with 2 tbsp apple juice concentrate and a strip of lemon zest added while reducing. Less floral but still delicious.',
          non_alcoholic: 'Use fresh-pressed or non-alcoholic sparkling cider. The flavour is essentially the same — no booze is needed for the glaze.',
          porchetta: 'Use a pork belly, lay flat, spread with garlic, fennel, rosemary, lemon zest, salt and pepper, roll and tie. Roast 325°F for 2 hrs then 450°F for 30 min. Glaze in last 20 min.'
        }
      },
      {
        id: 'asparagus-ramp-pea-gratin',
        name: 'Asparagus, Ramp & Pea Gratin',
        cuisine: 'French',
        version: 1,
        servings: {
          count: 4,
          note: 'Side dish. Pairs well with the glazed pork.'
        },
        metadata: {
          style: 'spring vegetable gratin with gruyère and cream',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: true,
            contains_dairy: true,
            contains_lentils: false
          },
          context: 'Easter lunch side. Can be assembled ahead and baked when needed.'
        },
        components: [
          {
            id: 'gratin',
            name: 'Gratin',
            kind: 'gratin',
            ingredients: [
              {
                section: 'Vegetables',
                items: [
                  {
                    name: 'Asparagus',
                    amount: 1,
                    unit: 'bunch',
                    prep: 'woody ends removed, cut into 2-inch pieces',
                    substitutions: [
                      { name: 'Broccolini', ratio: '1:1 by weight', notes: 'Cut into similar-sized pieces.' }
                    ]
                  },
                  {
                    name: 'Ramps or green onions',
                    amount: 1,
                    unit: 'bunch',
                    prep: 'roughly chopped',
                    substitutions: [
                      { name: 'Green onions/scallions', ratio: '1:1', notes: 'Use if ramps are unavailable.' }
                    ]
                  },
                  {
                    name: 'Fresh or frozen peas',
                    amount: 1,
                    unit: 'cup',
                    substitutions: []
                  },
                  {
                    name: 'Butter',
                    amount: 1,
                    unit: 'tbsp',
                    prep: 'for greasing the baking dish',
                    substitutions: []
                  }
                ]
              },
              {
                section: 'Gratin',
                items: [
                  {
                    name: 'Heavy cream',
                    amount: 200,
                    unit: 'ml',
                    substitutions: [
                      { name: 'Crème fraîche thinned with a splash of milk', ratio: '1:1', notes: 'Tangier result.' }
                    ]
                  },
                  {
                    name: 'Gruyère',
                    amount: 150,
                    unit: 'g',
                    prep: 'grated',
                    substitutions: [
                      { name: 'Comté', ratio: '1:1' },
                      { name: 'Emmental', ratio: '1:1', notes: 'Milder flavour.' }
                    ]
                  },
                  {
                    name: 'Nutmeg',
                    amount: 1,
                    unit: 'pinch',
                    substitutions: []
                  },
                  {
                    name: 'Salt and pepper',
                    amount: 1,
                    unit: 'tsp',
                    prep: 'to taste',
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Assemble',
                instructions: [
                  'Preheat oven to 375°F (190°C).',
                  'Butter a medium baking dish. Add asparagus, ramps, and peas. Season well with salt and pepper.'
                ]
              },
              {
                order: 2,
                title: 'Add cream and cheese',
                instructions: [
                  'Pour cream evenly over the vegetables.',
                  'Scatter grated gruyère over the top. Add a pinch of nutmeg.'
                ]
              },
              {
                order: 3,
                title: 'Bake',
                instructions: [
                  'Bake for 25–30 minutes until bubbling at the edges and golden on top.',
                  'Rest 5 minutes before serving.'
                ]
              }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Preheat and assemble', items: [{ component: 'gratin', step: 1 }, { component: 'gratin', step: 2 }] },
          { order: 2, label: 'Bake 25–30 min', items: [{ component: 'gratin', step: 3 }] }
        ],
        substitution_summary: {
          dairy_free: 'Use coconut cream and a dairy-free cheese, or top with seasoned breadcrumbs and olive oil instead of cheese.',
          make_ahead: 'Assemble up to a few hours ahead, cover and refrigerate. Add 5 minutes to baking time if going in cold.'
        }
      },
      {
        id: 'roasted-radishes-carrots-thyme',
        name: 'Roasted Radishes & Carrots with Thyme',
        cuisine: 'Sides',
        version: 1,
        servings: {
          count: 4,
          note: 'Side dish.'
        },
        metadata: {
          style: 'caramelised spring vegetables with butter, thyme, and red wine vinegar',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: true,
            contains_dairy: true,
            contains_lentils: false
          },
          context: 'Easter lunch side. Radishes mellow and sweeten beautifully in the oven.'
        },
        components: [
          {
            id: 'roasted-veg',
            name: 'Roasted Radishes & Carrots',
            kind: 'side',
            ingredients: [
              {
                section: 'Vegetables',
                items: [
                  {
                    name: 'Radishes',
                    amount: 1,
                    unit: 'bunch',
                    prep: 'halved',
                    substitutions: []
                  },
                  {
                    name: 'Baby carrots',
                    amount: 1,
                    unit: 'bunch',
                    prep: 'scrubbed, large ones halved lengthwise',
                    substitutions: [
                      { name: 'Regular carrots cut into batons', ratio: '1:1 by weight' }
                    ]
                  },
                  {
                    name: 'Butter',
                    amount: 2,
                    unit: 'tbsp',
                    prep: 'melted',
                    substitutions: [
                      { name: 'Olive oil', ratio: '1:1', notes: 'For vegan version.' }
                    ]
                  },
                  {
                    name: 'Olive oil',
                    amount: 1,
                    unit: 'tbsp',
                    substitutions: []
                  },
                  {
                    name: 'Fresh thyme',
                    amount: 5,
                    unit: 'sprigs',
                    substitutions: [
                      { name: 'Dried thyme', ratio: '5 sprigs ≈ 1/2 tsp dried' }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: 0.5,
                    unit: 'tsp',
                    substitutions: []
                  },
                  {
                    name: 'Black pepper',
                    amount: 0.25,
                    unit: 'tsp',
                    substitutions: []
                  },
                  {
                    name: 'Red wine vinegar',
                    amount: 1,
                    unit: 'tbsp',
                    prep: 'splashed on just before serving',
                    substitutions: [
                      { name: 'Sherry vinegar', ratio: '1:1', notes: 'Slightly nuttier.' },
                      { name: 'Lemon juice', ratio: '1:1', notes: 'Brighter.' }
                    ]
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Toss and roast',
                instructions: [
                  'Preheat oven to 400°F (200°C).',
                  'Toss radishes and carrots with melted butter, olive oil, thyme sprigs, salt, and pepper.',
                  'Spread on a baking sheet in a single layer — don\'t overcrowd or they\'ll steam rather than caramelise.',
                  'Roast 25–30 minutes until tender and caramelised at the edges.'
                ]
              },
              {
                order: 2,
                title: 'Finish and serve',
                instructions: [
                  'Splash with red wine vinegar right before serving.'
                ]
              }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Toss and roast (25–30 min)', items: [{ component: 'roasted-veg', step: 1 }] },
          { order: 2, label: 'Splash with vinegar and serve', items: [{ component: 'roasted-veg', step: 2 }] }
        ],
        substitution_summary: {
          vegan: 'Replace butter with additional olive oil (or use all olive oil). The caramelisation is slightly less rich but still excellent.',
          extra_flavour: 'Add a drizzle of honey with the butter before roasting, and scatter with fresh flat-leaf parsley to finish.'
        }
      },
      {
        id: 'mashed-potato-chive-butter',
        name: 'Mashed Potato with Chive Butter',
        cuisine: 'Sides',
        version: 1,
        servings: {
          count: 4,
          note: 'Side dish. Generous portions.'
        },
        metadata: {
          style: 'rich, creamy mashed potato with cultured butter and chives',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: true,
            contains_dairy: true,
            contains_lentils: false
          },
          context: 'Easter lunch side.'
        },
        components: [
          {
            id: 'mash',
            name: 'Mash',
            kind: 'side',
            ingredients: [
              {
                section: 'Mash',
                items: [
                  {
                    name: 'Yukon Gold potatoes',
                    amount: 7,
                    unit: 'medium',
                    prep: 'peeled and roughly chopped',
                    notes: '6–8 potatoes, about 1.2–1.4 kg total.',
                    substitutions: [
                      { name: 'Maris Piper', ratio: '1:1', notes: 'Classic for mash.' },
                      { name: 'Desiree', ratio: '1:1' }
                    ]
                  },
                  {
                    name: 'Cultured butter',
                    amount: 75,
                    unit: 'g',
                    prep: 'cut into cubes',
                    notes: 'Cultured butter adds a subtle tang. Regular unsalted butter also works.',
                    substitutions: [
                      { name: 'Regular unsalted butter', ratio: '1:1' }
                    ]
                  },
                  {
                    name: 'Warm milk or cream',
                    amount: 100,
                    unit: 'ml',
                    prep: 'warmed before adding',
                    substitutions: [
                      { name: 'Oat milk', ratio: '1:1', notes: 'Dairy-free option, less rich.' }
                    ]
                  },
                  {
                    name: 'Chives',
                    amount: 1,
                    unit: 'small bunch',
                    prep: 'finely chopped',
                    substitutions: [
                      { name: 'Flat-leaf parsley', ratio: '1:1', notes: 'Different flavour but works well.' }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: 1,
                    unit: 'tsp',
                    prep: 'for cooking water, plus more to taste',
                    substitutions: []
                  },
                  {
                    name: 'White pepper',
                    amount: 0.25,
                    unit: 'tsp',
                    substitutions: [
                      { name: 'Black pepper', ratio: '1:1', notes: 'Visible flecks but same flavour.' }
                    ]
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Boil potatoes',
                instructions: [
                  'Cover potatoes with cold, well-salted water. Bring to a boil and cook 15–20 minutes until completely tender when pierced with a knife.'
                ]
              },
              {
                order: 2,
                title: 'Steam dry',
                instructions: [
                  'Drain well and return to the pot over low heat for 1–2 minutes, shaking occasionally, to steam off excess moisture.',
                  'Dry potatoes absorb butter better and make fluffier mash.'
                ]
              },
              {
                order: 3,
                title: 'Mash and enrich',
                instructions: [
                  'Mash thoroughly or pass through a ricer for the smoothest result.',
                  'Beat in butter and warm milk a little at a time until smooth and creamy.',
                  'Season well with salt and white pepper.'
                ]
              },
              {
                order: 4,
                title: 'Finish with chives',
                instructions: [
                  'Fold in most of the chives, reserving a little for garnish.',
                  'Top with remaining chives to serve.'
                ]
              }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Boil potatoes (15–20 min)', items: [{ component: 'mash', step: 1 }] },
          { order: 2, label: 'Steam dry, mash, and enrich', items: [{ component: 'mash', step: 2 }, { component: 'mash', step: 3 }] },
          { order: 3, label: 'Finish with chives', items: [{ component: 'mash', step: 4 }] }
        ],
        substitution_summary: {
          dairy_free: 'Use olive oil or dairy-free butter in place of cultured butter, and oat milk or potato cooking water instead of milk.',
          extra_rich: 'Use all cream instead of milk, and increase butter to 100g. Add a spoonful of crème fraîche at the end for tang.'
        }
      },
      {
        id: 'lemon-posset-shortbread',
        name: 'Lemon Posset with Shortbread & Edible Flowers',
        cuisine: 'British',
        version: 1,
        servings: {
          count: 4,
          note: 'Dessert. Make the posset a day ahead.'
        },
        metadata: {
          style: 'silky set cream dessert with fennel shortbread and edible flowers',
          diet: {
            vegetarian: true,
            vegan: false,
            gluten_free: false,
            contains_dairy: true,
            contains_lentils: false
          },
          context: 'Easter lunch dessert. The posset sets with lemon juice alone — no gelatine needed. The fennel seeds in the shortbread are a lovely surprise.'
        },
        components: [
          {
            id: 'posset',
            name: 'Lemon Posset',
            kind: 'dessert',
            ingredients: [
              {
                section: 'Posset',
                items: [
                  {
                    name: 'Heavy cream',
                    amount: 600,
                    unit: 'ml',
                    substitutions: []
                  },
                  {
                    name: 'Sugar',
                    amount: 150,
                    unit: 'g',
                    substitutions: []
                  },
                  {
                    name: 'Lemon juice',
                    amount: 80,
                    unit: 'ml',
                    prep: 'freshly squeezed, about 2 lemons',
                    substitutions: [
                      { name: 'Lime juice', ratio: '1:1', notes: 'Sharper, slightly floral.' }
                    ]
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Cook cream and set',
                instructions: [
                  'Combine cream and sugar in a heavy saucepan. Bring to a boil over medium heat, stirring to dissolve the sugar.',
                  'Once boiling, cook for exactly 3 minutes — use a timer. The cream will thicken slightly.',
                  'Remove from heat. Stir in lemon juice.',
                  'Pour into 4 glasses or ramekins. Cool to room temperature, then refrigerate for at least 3 hours or overnight.',
                  'The posset is set when it holds a slight wobble but doesn\'t slosh when tilted.'
                ]
              }
            ]
          },
          {
            id: 'shortbread',
            name: 'Fennel Shortbread',
            kind: 'biscuit',
            ingredients: [
              {
                section: 'Shortbread',
                items: [
                  {
                    name: 'All-purpose flour',
                    amount: 150,
                    unit: 'g',
                    substitutions: []
                  },
                  {
                    name: 'Butter',
                    amount: 100,
                    unit: 'g',
                    prep: 'softened',
                    substitutions: []
                  },
                  {
                    name: 'Icing sugar',
                    amount: 50,
                    unit: 'g',
                    substitutions: [
                      { name: 'Caster sugar', ratio: '1:1', notes: 'Slightly crunchier texture.' }
                    ]
                  },
                  {
                    name: 'Fennel seeds',
                    amount: 0.5,
                    unit: 'tsp',
                    prep: 'lightly crushed',
                    notes: 'Subtle anise note — unexpected and very good with lemon.',
                    optional: true,
                    substitutions: [
                      { name: 'Lemon zest', ratio: '1/2 tsp fennel seeds ≈ zest of 1/2 lemon', notes: 'Keeps it citrus-forward.' }
                    ]
                  },
                  {
                    name: 'Salt',
                    amount: 1,
                    unit: 'pinch',
                    substitutions: []
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Make shortbread dough',
                instructions: [
                  'Preheat oven to 325°F (165°C).',
                  'Beat butter and icing sugar until pale and fluffy.',
                  'Mix in flour, fennel seeds, and salt until a dough forms — it will look crumbly, then come together.'
                ]
              },
              {
                order: 2,
                title: 'Roll, cut, and bake',
                instructions: [
                  'Roll dough to about 5mm thick on a lightly floured surface. Cut into fingers or rounds.',
                  'Bake 15–18 minutes until just barely golden at the edges. The shortbread should look pale — it firms up as it cools.',
                  'Cool completely on the tray before handling.'
                ]
              }
            ]
          },
          {
            id: 'assembly',
            name: 'Assembly',
            kind: 'assembly',
            ingredients: [
              {
                section: 'To serve',
                items: [
                  {
                    name: 'Edible flowers',
                    amount: 1,
                    unit: 'small handful',
                    prep: 'violet, nasturtium, or borage',
                    substitutions: [
                      { name: 'Lemon zest curls', ratio: 'garnish', notes: 'Elegant alternative if flowers are unavailable.' }
                    ]
                  }
                ]
              }
            ],
            steps: [
              {
                order: 1,
                title: 'Serve',
                instructions: [
                  'Top each chilled posset with a few edible flowers.',
                  'Serve with shortbread fingers on the side.'
                ]
              }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Make posset and refrigerate (3+ hrs or overnight)', items: [{ component: 'posset', step: 1 }] },
          { order: 2, label: 'Make shortbread dough and bake (30 min)', items: [{ component: 'shortbread', step: 1 }, { component: 'shortbread', step: 2 }] },
          { order: 3, label: 'Decorate and serve', items: [{ component: 'assembly', step: 1 }] }
        ],
        substitution_summary: {
          gluten_free: 'Use a 1:1 gluten-free flour blend for the shortbread. Rice flour-based blends work particularly well for a shortbread texture.',
          no_flowers: 'Top posset with lemon zest curls, a thin lemon slice, or a few fresh mint leaves instead.',
          lime_version: 'Replace lemon juice with lime juice for a sharper, more tropical posset. Reduce to 70ml as limes are more acidic.'
        }
      }
      ,
      {
        id: 'pad-see-ew',
        name: 'Pad See Ew',
        cuisine: 'Thai',
        version: 1,
        servings: { count: 2, note: 'One wok batch; scale sauce proportionally.' },
        metadata: {
          style: 'wide rice noodle stir-fry, charred and smoky',
          diet: { vegetarian: false, vegan: false, gluten_free: false, contains_dairy: false, contains_lentils: false },
          context: 'Stephen\'s low-sodium version. No sugar — wok char provides all the sweetness. High heat is non-negotiable for proper wok hei. Part of the Thai noodle collection.'
        },
        components: [
          {
            id: 'pse-noodles',
            name: 'Homemade Wide Rice Noodles',
            kind: 'noodle',
            ingredients: [
              {
                section: 'Noodle batter',
                items: [
                  { name: 'rice flour', amount: 200, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'tapioca starch', amount: 50, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'water', amount: 300, unit: 'ml', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 1, unit: 'tsp', prep: '', notes: 'Plus more for oiling the steaming plate', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Mix batter', instructions: ['Whisk rice flour and tapioca starch into the water until completely smooth with no lumps. Add oil. Batter should be thin, like light cream.'] },
              { order: 2, title: 'Steam in sheets', instructions: ['Oil a heatproof plate or rimmed baking sheet. Pour a thin layer of batter (~3mm). Steam on high for 3–4 minutes until the sheet is set and translucent.'] },
              { order: 3, title: 'Cool and cut', instructions: ['Let each sheet cool slightly. Brush surface lightly with oil. Stack cooled sheets with oiled parchment between them. Cut into wide strips, roughly 2–3cm wide.'] },
              { order: 4, title: 'Rest before stir-frying', instructions: ['Let noodles sit at room temperature for at least 30 minutes before using. Cold noodles straight from the fridge will steam rather than char.'] }
            ]
          },
          {
            id: 'pse-stir-fry',
            name: 'Pad See Ew Stir-Fry',
            kind: 'stir-fry',
            ingredients: [
              {
                section: 'Sauce',
                items: [
                  { name: 'low-sodium soy sauce', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [{ name: 'Tamari', ratio: '1:1', notes: 'For gluten-free' }] },
                  { name: 'low-sodium dark soy sauce', amount: 1, unit: 'tsp', prep: '', notes: 'Provides colour and molasses depth', optional: false, substitutions: [] },
                  { name: 'low-sodium oyster sauce', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [{ name: 'Mushroom oyster sauce', ratio: '1:1', notes: 'Keeps it vegetarian and reduces sodium further' }] },
                  { name: 'rice vinegar', amount: 1, unit: 'tsp', prep: '', notes: 'Brightens and cuts richness', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'Stir-fry',
                items: [
                  { name: 'eggs', amount: 2, unit: null, prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'Chinese broccoli (gai lan)', amount: 1, unit: 'bunch', prep: 'stems sliced on the bias, leaves roughly torn', notes: '', optional: false, substitutions: [{ name: 'Broccolini', ratio: '1:1', notes: 'Slightly sweeter, works well' }, { name: 'Baby bok choy', ratio: '1:1', notes: 'Softer texture, shorter cook time' }] },
                  { name: 'garlic', amount: 4, unit: 'cloves', prep: 'roughly chopped', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 2, unit: 'tbsp', prep: '', notes: 'High smoke-point — avocado or vegetable', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Mix sauce', instructions: ['Whisk together soy sauce, dark soy, oyster sauce, and rice vinegar. Set aside within arm\'s reach of the wok.'] },
              { order: 2, title: 'Get the wok screaming hot', instructions: ['Heat wok over highest possible flame until it begins to smoke. Add oil and swirl to coat. Without high heat, the noodles will steam rather than char.'] },
              { order: 3, title: 'Char the noodles', instructions: ['Add noodles and press flat against the wok surface. Leave undisturbed for 30–45 seconds to develop char. Flip sections and char the other side. Remove and set aside.'] },
              { order: 4, title: 'Cook garlic and gai lan stems', instructions: ['Add a splash more oil if needed. Add garlic and gai lan stems. Stir-fry for 60 seconds until garlic is fragrant and stems are bright green.'] },
              { order: 5, title: 'Push aside and scramble eggs', instructions: ['Push vegetables to the side. Crack eggs directly into the wok. Scramble loosely — pull them off heat while still slightly underdone.'] },
              { order: 6, title: 'Combine and sauce', instructions: ['Return noodles to the wok. Add gai lan leaves. Pour sauce over everything. Toss quickly over high heat for 30–45 seconds until sauce coats and leaves just wilt.'] },
              { order: 7, title: 'Serve immediately', instructions: ['Plate and eat right away. Pad see ew does not wait. White pepper and extra vinegar on the side.'] }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Noodles (up to 1 day ahead)', items: [{ component: 'pse-noodles', step: 1 }, { component: 'pse-noodles', step: 2 }, { component: 'pse-noodles', step: 3 }, { component: 'pse-noodles', step: 4 }] },
          { order: 2, label: 'Stir-fry (last minute)', items: [{ component: 'pse-stir-fry', step: 1 }, { component: 'pse-stir-fry', step: 2 }, { component: 'pse-stir-fry', step: 3 }, { component: 'pse-stir-fry', step: 4 }, { component: 'pse-stir-fry', step: 5 }, { component: 'pse-stir-fry', step: 6 }, { component: 'pse-stir-fry', step: 7 }] }
        ],
        substitution_summary: {
          vegetarian: 'Use mushroom oyster sauce 1:1. Omit eggs or use a tofu scramble.',
          gluten_free: 'Use tamari for soy sauce and a certified GF oyster sauce or mushroom substitute.',
          protein: 'Beef, pork, shrimp, or firm tofu all work. Add with the garlic in step 4.'
        }
      },
      {
        id: 'pad-kee-mao',
        name: 'Pad Kee Mao (Drunken Noodles)',
        cuisine: 'Thai',
        version: 1,
        servings: { count: 2, note: 'One wok batch.' },
        metadata: {
          style: 'spicy wide rice noodle stir-fry with holy basil',
          diet: { vegetarian: false, vegan: false, gluten_free: false, contains_dairy: false, contains_lentils: false },
          context: 'Stephen\'s low-sodium version. No sugar — the heat and basil carry the dish entirely. Fish sauce used sparingly for umami. Part of the Thai noodle collection.'
        },
        components: [
          {
            id: 'pkm-noodles',
            name: 'Homemade Wide Rice Noodles',
            kind: 'noodle',
            ingredients: [
              {
                section: 'Noodle batter',
                items: [
                  { name: 'rice flour', amount: 200, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'tapioca starch', amount: 50, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'water', amount: 300, unit: 'ml', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 1, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Mix batter', instructions: ['Whisk rice flour and tapioca starch into water until smooth. Add oil.'] },
              { order: 2, title: 'Steam in sheets', instructions: ['Oil a heatproof plate. Pour thin layer of batter (~3mm). Steam on high 3–4 minutes until set and translucent.'] },
              { order: 3, title: 'Cool and cut wide', instructions: ['Cool each sheet. Brush with oil. Stack with oiled parchment between. Cut into wide strips, ~2–3cm.'] },
              { order: 4, title: 'Rest', instructions: ['Rest at room temperature 30+ minutes before stir-frying.'] }
            ]
          },
          {
            id: 'pkm-stir-fry',
            name: 'Drunken Noodle Stir-Fry',
            kind: 'stir-fry',
            ingredients: [
              {
                section: 'Sauce',
                items: [
                  { name: 'low-sodium soy sauce', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'low-sodium oyster sauce', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [{ name: 'Mushroom oyster sauce', ratio: '1:1', notes: 'Vegetarian option' }] },
                  { name: 'fish sauce', amount: 1, unit: 'tsp', prep: '', notes: 'Accent only — umami depth without dominating', optional: false, substitutions: [{ name: 'Low-sodium soy sauce', ratio: '1:1', notes: 'To keep it fully vegetarian' }] }
                ]
              },
              {
                section: 'Stir-fry',
                items: [
                  { name: 'fresh Thai chilies', amount: 4, unit: null, prep: 'thinly sliced', notes: '3–5 depending on heat tolerance; seeds in for full heat', optional: false, substitutions: [{ name: 'Serrano chilies', ratio: '1:1', notes: 'Milder but good character' }] },
                  { name: 'holy basil', amount: 1, unit: 'cup', prep: 'leaves only, loosely packed', notes: 'Non-negotiable — do not sub regular basil', optional: false, substitutions: [{ name: 'Thai basil', ratio: '1:1', notes: 'Different flavour profile but acceptable' }] },
                  { name: 'garlic', amount: 4, unit: 'cloves', prep: 'roughly chopped', notes: '', optional: false, substitutions: [] },
                  { name: 'shallots', amount: 2, unit: null, prep: 'thinly sliced', notes: '', optional: false, substitutions: [] },
                  { name: 'bell pepper', amount: 0.5, unit: null, prep: 'sliced into strips', notes: 'Red or yellow for sweetness', optional: false, substitutions: [] },
                  { name: 'protein of choice', amount: 200, unit: 'g', prep: 'sliced or ground', notes: 'Chicken, beef, pork, or firm tofu', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 2, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Mix sauce', instructions: ['Combine soy sauce, oyster sauce, and fish sauce. Set by the wok.'] },
              { order: 2, title: 'High heat, fry garlic and chilies', instructions: ['Heat wok until smoking. Add oil. Add garlic, shallots, and chilies. Stir-fry 30 seconds until fragrant — this should smell intense.'] },
              { order: 3, title: 'Cook protein', instructions: ['Add protein. Stir-fry on high heat until cooked through and starting to colour, 2–3 minutes.'] },
              { order: 4, title: 'Add bell pepper', instructions: ['Add bell pepper strips. Toss 60 seconds to soften slightly while keeping some crunch.'] },
              { order: 5, title: 'Add noodles and sauce', instructions: ['Add noodles and pour sauce over. Toss everything over highest heat for 60–90 seconds. Noodles should pick up char at the edges.'] },
              { order: 6, title: 'Finish with basil', instructions: ['Kill the heat. Add holy basil. Toss until just wilted — about 10 seconds off heat. The basil should perfume the whole dish. Plate immediately.'] }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Noodles (up to 1 day ahead)', items: [{ component: 'pkm-noodles', step: 1 }, { component: 'pkm-noodles', step: 2 }, { component: 'pkm-noodles', step: 3 }, { component: 'pkm-noodles', step: 4 }] },
          { order: 2, label: 'Stir-fry (last minute)', items: [{ component: 'pkm-stir-fry', step: 1 }, { component: 'pkm-stir-fry', step: 2 }, { component: 'pkm-stir-fry', step: 3 }, { component: 'pkm-stir-fry', step: 4 }, { component: 'pkm-stir-fry', step: 5 }, { component: 'pkm-stir-fry', step: 6 }] }
        ],
        substitution_summary: {
          vegetarian: 'Use mushroom oyster sauce, omit fish sauce or sub low-sodium soy, use firm tofu or extra veggies.',
          heat_level: 'Start with 2 chilies. Holy basil carries its own peppery heat so the chilies are additive.',
          basil: 'Holy basil (bai krapao) is the soul of this dish. Thai basil is an acceptable emergency sub but the flavour profile shifts.'
        }
      },
      {
        id: 'pad-thai-stephens-version',
        name: 'Pad Thai (Stephen\'s Version)',
        cuisine: 'Thai',
        version: 1,
        servings: { count: 2, note: 'One wok batch.' },
        metadata: {
          style: 'thin rice noodle stir-fry, tamarind-forward, no refined sugar',
          diet: { vegetarian: false, vegan: false, gluten_free: true, contains_dairy: false, contains_lentils: false },
          context: 'Stephen\'s low-sodium version. Maple syrup replaces palm sugar — just enough to balance tamarind. Homemade thin rice noodles. Part of the Thai noodle collection.'
        },
        components: [
          {
            id: 'pt-noodles',
            name: 'Homemade Thin Rice Noodles',
            kind: 'noodle',
            ingredients: [
              {
                section: 'Noodle batter',
                items: [
                  { name: 'rice flour', amount: 200, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'tapioca starch', amount: 30, unit: 'g', prep: '', notes: 'Less than wide noodles — thinner batter', optional: false, substitutions: [] },
                  { name: 'water', amount: 320, unit: 'ml', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 1, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Mix batter', instructions: ['Whisk rice flour, tapioca starch, water, and oil until smooth. Batter is thinner than the wide noodle version.'] },
              { order: 2, title: 'Steam in thin sheets', instructions: ['Oil a heatproof plate. Pour a very thin layer. Steam 3–4 minutes until set and translucent.'] },
              { order: 3, title: 'Cut into thin strips', instructions: ['Cool, brush with oil, stack with oiled parchment. Cut into thin strips, approximately 3–4mm wide. Or roll loosely and cut crosswise.'] },
              { order: 4, title: 'Rest', instructions: ['Rest at room temperature 30+ minutes before stir-frying.'] }
            ]
          },
          {
            id: 'pt-stir-fry',
            name: 'Pad Thai Assembly',
            kind: 'stir-fry',
            ingredients: [
              {
                section: 'Sauce',
                items: [
                  { name: 'tamarind paste (unsweetened)', amount: 2, unit: 'tbsp', prep: 'dissolved in 3 tbsp warm water if using block tamarind', notes: 'The backbone of the dish — provides sour complexity', optional: false, substitutions: [] },
                  { name: 'fish sauce (low sodium)', amount: 1.5, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [{ name: 'Soy sauce + a squeeze of lime', ratio: '1:1', notes: 'Keeps it vegetarian' }] },
                  { name: 'maple syrup', amount: 1, unit: 'tsp', prep: '', notes: 'Just enough to balance tamarind; replaces palm sugar', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'Stir-fry',
                items: [
                  { name: 'eggs', amount: 2, unit: null, prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'firm tofu', amount: 150, unit: 'g', prep: 'pressed and cut into small cubes', notes: '', optional: true, substitutions: [{ name: 'Shrimp', ratio: '1:1 by weight', notes: 'Classic protein option' }] },
                  { name: 'bean sprouts', amount: 1, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'garlic chives', amount: 0.5, unit: 'cup', prep: 'cut into 2cm lengths', notes: 'Or substitute with green onion tops', optional: false, substitutions: [{ name: 'Green onion tops', ratio: '1:1', notes: 'Milder but works' }] },
                  { name: 'garlic', amount: 3, unit: 'cloves', prep: 'minced', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 2, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'To serve',
                items: [
                  { name: 'unsalted roasted peanuts', amount: 3, unit: 'tbsp', prep: 'roughly chopped', notes: '', optional: false, substitutions: [] },
                  { name: 'lime', amount: 1, unit: null, prep: 'cut into wedges', notes: '', optional: false, substitutions: [] },
                  { name: 'dried chili flakes', amount: null, unit: null, prep: '', notes: 'On the side', optional: true, substitutions: [] },
                  { name: 'preserved radish (chai poh)', amount: 2, unit: 'tbsp', prep: 'rinsed well under cold water to reduce sodium', notes: 'Omit if you can\'t find or want to keep sodium lower', optional: true, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Mix and taste sauce', instructions: ['Combine tamarind water, fish sauce, and maple syrup. Taste — it should be sour-forward, lightly salty, barely sweet. Adjust before cooking, not after.'] },
              { order: 2, title: 'Fry tofu until golden', instructions: ['Heat wok on high. Add 1 tbsp oil. Fry tofu cubes until golden on most sides, 3–4 minutes. Remove and set aside.'] },
              { order: 3, title: 'Fry garlic and preserved radish', instructions: ['Add remaining oil. Add garlic (and rinsed preserved radish if using). Stir-fry 30 seconds until fragrant.'] },
              { order: 4, title: 'Add noodles and sauce', instructions: ['Add noodles and pour sauce over. Toss on high heat 60–90 seconds until noodles absorb the sauce and start to catch at the edges.'] },
              { order: 5, title: 'Push aside and scramble eggs', instructions: ['Push noodles to one side. Add eggs to the empty side. Scramble until 80% set, then fold into noodles.'] },
              { order: 6, title: 'Add tofu and sprouts', instructions: ['Return tofu to the wok. Add bean sprouts and garlic chives. Toss quickly — just 20–30 seconds so sprouts stay crunchy.'] },
              { order: 7, title: 'Plate and garnish', instructions: ['Plate immediately. Top with chopped peanuts. Serve with lime wedges and dried chili on the side — never mixed in.'] }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Noodles (up to 1 day ahead)', items: [{ component: 'pt-noodles', step: 1 }, { component: 'pt-noodles', step: 2 }, { component: 'pt-noodles', step: 3 }, { component: 'pt-noodles', step: 4 }] },
          { order: 2, label: 'Stir-fry (last minute)', items: [{ component: 'pt-stir-fry', step: 1 }, { component: 'pt-stir-fry', step: 2 }, { component: 'pt-stir-fry', step: 3 }, { component: 'pt-stir-fry', step: 4 }, { component: 'pt-stir-fry', step: 5 }, { component: 'pt-stir-fry', step: 6 }, { component: 'pt-stir-fry', step: 7 }] }
        ],
        substitution_summary: {
          vegetarian: 'Replace fish sauce with soy sauce + lime squeeze. Use tofu only, skip eggs for vegan.',
          tamarind: 'Block tamarind dissolved in warm water is best. Tamarind concentrate works — use 1.5 tbsp and taste.',
          peanut_free: 'Omit peanuts or sub with toasted sunflower seeds for crunch.'
        }
      },
      {
        id: 'pad-woon-sen',
        name: 'Pad Woon Sen (Glass Noodle Stir-Fry)',
        cuisine: 'Thai',
        version: 1,
        servings: { count: 2, note: 'One wok batch.' },
        metadata: {
          style: 'light glass noodle stir-fry with egg and vegetables',
          diet: { vegetarian: false, vegan: false, gluten_free: false, contains_dairy: false, contains_lentils: false },
          context: 'The most forgiving dish in the Thai noodle collection — glass noodles are difficult to overcook. No sugar needed. Good candidate for a fully homemade no-salt oyster sauce substitute.'
        },
        components: [
          {
            id: 'pws-stir-fry',
            name: 'Glass Noodle Stir-Fry',
            kind: 'stir-fry',
            ingredients: [
              {
                section: 'Noodles',
                items: [
                  { name: 'mung bean glass noodles (woon sen)', amount: 100, unit: 'g', prep: 'soaked in room-temperature water 15–20 minutes, drained', notes: 'Do not use hot water — they become too soft', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'Sauce',
                items: [
                  { name: 'low-sodium oyster sauce', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [{ name: 'Mushroom + cornstarch + soy substitute', ratio: '1:1', notes: 'Blend 2 tbsp mushroom stock, 1 tsp cornstarch, 1 tsp soy sauce — simmer until thick' }] },
                  { name: 'low-sodium soy sauce', amount: 1, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'white pepper', amount: null, unit: null, prep: '', notes: 'A generous pinch — essential to this dish', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'Stir-fry',
                items: [
                  { name: 'eggs', amount: 2, unit: null, prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'carrot', amount: 1, unit: null, prep: 'julienned or cut into thin matchsticks', notes: '', optional: false, substitutions: [] },
                  { name: 'cabbage', amount: 1, unit: 'cup', prep: 'thinly sliced', notes: '', optional: false, substitutions: [] },
                  { name: 'celery', amount: 2, unit: 'stalks', prep: 'sliced on the bias', notes: 'Adds crunch and a mild anise note', optional: false, substitutions: [] },
                  { name: 'garlic', amount: 3, unit: 'cloves', prep: 'minced', notes: '', optional: false, substitutions: [] },
                  { name: 'green onion', amount: 3, unit: 'stalks', prep: 'cut into 2cm lengths', notes: '', optional: false, substitutions: [] },
                  { name: 'protein of choice', amount: 150, unit: 'g', prep: 'sliced thin or ground', notes: 'Pork, shrimp, or chicken', optional: true, substitutions: [] },
                  { name: 'neutral oil', amount: 2, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Soak noodles', instructions: ['Cover glass noodles with room-temperature water and soak 15–20 minutes until pliable. Drain well. Do not use hot water.'] },
              { order: 2, title: 'Mix sauce', instructions: ['Combine oyster sauce, soy sauce, and white pepper. Set aside.'] },
              { order: 3, title: 'Stir-fry aromatics and protein', instructions: ['Heat wok on high. Add oil. Fry garlic 20 seconds. Add protein if using and stir-fry until cooked through, 2–3 minutes. Add carrot and celery, toss 60 seconds.'] },
              { order: 4, title: 'Add noodles and sauce', instructions: ['Add drained glass noodles. Pour sauce over. Toss on high heat 60–90 seconds — glass noodles absorb sauce quickly and become glossy.'] },
              { order: 5, title: 'Add egg and soft vegetables', instructions: ['Push noodles aside. Scramble eggs in the space. Fold into noodles once 80% set. Add cabbage and green onion. Toss 20–30 seconds — everything should be barely cooked.'] }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Prep (15 min ahead)', items: [{ component: 'pws-stir-fry', step: 1 }, { component: 'pws-stir-fry', step: 2 }] },
          { order: 2, label: 'Cook (last 10 minutes)', items: [{ component: 'pws-stir-fry', step: 3 }, { component: 'pws-stir-fry', step: 4 }, { component: 'pws-stir-fry', step: 5 }] }
        ],
        substitution_summary: {
          vegetarian: 'Omit protein or use extra-firm tofu. Mushroom oyster sauce swap keeps it vegetarian.',
          oyster_sauce_sub: 'Homemade substitute: simmer 2 tbsp mushroom stock with 1 tsp cornstarch and 1 tsp soy sauce until thick. Excellent low-sodium option.',
          gluten_free: 'Glass noodles are naturally GF. Use tamari and a GF oyster sauce or the mushroom substitute.'
        }
      },
      {
        id: 'rad-na',
        name: 'Rad Na (Rice Noodles in Gravy)',
        cuisine: 'Thai',
        version: 1,
        servings: { count: 2, note: 'One wok batch for the noodles; gravy makes enough for 2–3 servings.' },
        metadata: {
          style: 'charred wide rice noodles in a savoury cornstarch gravy',
          diet: { vegetarian: false, vegan: false, gluten_free: false, contains_dairy: false, contains_lentils: false },
          context: 'The char on the noodles is the whole point — dry wok first, no sauce. Gravy can be made ahead and reheated. No sugar. Part of the Thai noodle collection.'
        },
        components: [
          {
            id: 'rn-noodles',
            name: 'Charred Wide Rice Noodles',
            kind: 'noodle',
            ingredients: [
              {
                section: 'Noodle batter',
                items: [
                  { name: 'rice flour', amount: 200, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'tapioca starch', amount: 50, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'water', amount: 300, unit: 'ml', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 1, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Make and cut wide noodles', instructions: ['Whisk flours into water, add oil. Oil a heatproof plate, pour thin layer, steam 3–4 minutes until set. Cool, oil, stack with parchment, cut wide (~2–3cm). Rest at room temperature before using.'] },
              { order: 2, title: 'Dry-char in wok', instructions: ['Heat wok until smoking with no oil. Add noodles in a single layer. Press flat. Leave completely undisturbed 45–60 seconds until deep char forms. This is the payoff step — do not rush it.'] },
              { order: 3, title: 'Flip and char other side', instructions: ['Flip noodle sections. Another 30–40 seconds on the second side. Remove to a plate. They should have visible dark char spots and a slightly smoky smell.'] }
            ]
          },
          {
            id: 'rn-gravy',
            name: 'Rad Na Gravy',
            kind: 'sauce',
            ingredients: [
              {
                section: 'Gravy',
                items: [
                  { name: 'low-sodium chicken or pork stock', amount: 400, unit: 'ml', prep: '', notes: '', optional: false, substitutions: [{ name: 'Vegetable stock', ratio: '1:1', notes: 'For a vegetarian version' }] },
                  { name: 'low-sodium oyster sauce', amount: 1.5, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [{ name: 'Mushroom oyster sauce', ratio: '1:1', notes: 'Vegetarian option' }] },
                  { name: 'low-sodium soy sauce', amount: 1, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'cornstarch', amount: 2, unit: 'tbsp', prep: 'mixed with 3 tbsp cold water to make a slurry', notes: 'Make slurry just before using so it doesn\'t settle', optional: false, substitutions: [] },
                  { name: 'white pepper', amount: null, unit: null, prep: '', notes: 'A generous pinch', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'With gravy',
                items: [
                  { name: 'gai lan or broccoli', amount: 1, unit: 'bunch', prep: 'stems sliced, florets separated', notes: '', optional: false, substitutions: [] },
                  { name: 'protein of choice', amount: 200, unit: 'g', prep: 'sliced thin', notes: 'Beef, pork, or chicken', optional: true, substitutions: [] },
                  { name: 'garlic', amount: 3, unit: 'cloves', prep: 'minced', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Fry garlic and protein', instructions: ['Heat wok on high with oil. Add garlic, fry 20 seconds. Add protein and stir-fry until cooked through, 2–3 minutes.'] },
              { order: 2, title: 'Add gai lan stems', instructions: ['Add gai lan stems. Stir-fry 60 seconds until bright green.'] },
              { order: 3, title: 'Add stock and sauces', instructions: ['Pour in stock, oyster sauce, soy sauce, and white pepper. Bring to a boil.'] },
              { order: 4, title: 'Thicken with cornstarch slurry', instructions: ['Re-stir the cornstarch slurry. Pour in while stirring constantly. Gravy should thicken within 30–60 seconds to coat a spoon. Add gai lan leaves, stir until just wilted.'] },
              { order: 5, title: 'Pour over noodles', instructions: ['Pour the hot gravy directly over the charred noodles on the plate. Do not toss — the contrast of dry char under glossy gravy is the dish.'] }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Noodles (up to 1 day ahead)', items: [{ component: 'rn-noodles', step: 1 }] },
          { order: 2, label: 'Char noodles (5 min before serving)', items: [{ component: 'rn-noodles', step: 2 }, { component: 'rn-noodles', step: 3 }] },
          { order: 3, label: 'Make gravy (can be made ahead, reheat)', items: [{ component: 'rn-gravy', step: 1 }, { component: 'rn-gravy', step: 2 }, { component: 'rn-gravy', step: 3 }, { component: 'rn-gravy', step: 4 }, { component: 'rn-gravy', step: 5 }] }
        ],
        substitution_summary: {
          vegetarian: 'Use vegetable stock, mushroom oyster sauce, and omit protein or use tofu.',
          make_ahead: 'Gravy can be made and refrigerated up to 2 days. Reheat and re-thicken with a small extra slurry if needed. Char noodles fresh.',
          gluten_free: 'Use tamari and a GF oyster sauce. Cornstarch is naturally GF.'
        }
      },
      {
        id: 'boat-noodles',
        name: 'Boat Noodles (Kuay Tiew Reua)',
        cuisine: 'Thai',
        version: 1,
        servings: { count: 4, note: 'Serve in small bowls, street-food style. The broth makes enough for generous refills.' },
        metadata: {
          style: 'small-bowl spiced beef broth soup with thin rice noodles',
          diet: { vegetarian: false, vegan: false, gluten_free: false, contains_dairy: false, contains_lentils: false },
          context: 'Stephen\'s low-sodium version. Traditional recipe uses blood to thicken — omitted here for a cleaner broth. Spices do the heavy lifting so salt can stay low. Serve small-bowl style with lots of condiments on the side. Part of the Thai noodle collection.'
        },
        components: [
          {
            id: 'bn-broth',
            name: 'Spiced Boat Noodle Broth',
            kind: 'broth',
            ingredients: [
              {
                section: 'Broth',
                items: [
                  { name: 'low-sodium beef or pork stock', amount: 1, unit: 'L', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'cinnamon stick', amount: 1, unit: null, prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'star anise', amount: 2, unit: null, prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'coriander seeds', amount: 1, unit: 'tsp', prep: 'lightly crushed', notes: '', optional: false, substitutions: [] },
                  { name: 'galangal', amount: 3, unit: 'slices', prep: 'fresh or frozen', notes: 'Sub ginger if unavailable, slightly different result', optional: false, substitutions: [{ name: 'Fresh ginger', ratio: '1:1', notes: 'Sharper but works in a pinch' }] },
                  { name: 'low-sodium soy sauce', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'fish sauce', amount: 1, unit: 'tsp', prep: '', notes: 'Accent only', optional: false, substitutions: [] },
                  { name: 'white pepper', amount: null, unit: null, prep: '', notes: 'Generous pinch', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Toast whole spices', instructions: ['In a dry pot, briefly toast cinnamon, star anise, and coriander seeds over medium heat until fragrant, about 60 seconds. Watch carefully — they burn fast.'] },
              { order: 2, title: 'Build and simmer broth', instructions: ['Add stock, galangal, soy sauce, fish sauce, and white pepper. Bring to a gentle simmer. Cook uncovered 20–30 minutes.'] },
              { order: 3, title: 'Taste and adjust', instructions: ['Taste the broth. It should be fragrant, lightly savoury, and warm with spice. Adjust soy or fish sauce in small increments — a little goes a long way.'] },
              { order: 4, title: 'Strain and keep warm', instructions: ['Strain out all whole spices and galangal. Keep broth at a low simmer until serving.'] }
            ]
          },
          {
            id: 'bn-noodles',
            name: 'Homemade Thin Rice Noodles',
            kind: 'noodle',
            ingredients: [
              {
                section: 'Noodle batter',
                items: [
                  { name: 'rice flour', amount: 200, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'tapioca starch', amount: 30, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'water', amount: 320, unit: 'ml', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 1, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Make thin rice noodles', instructions: ['Whisk all ingredients until smooth. Oil a heatproof plate, pour thin layer, steam 3–4 min. Cool, brush with oil, cut into thin strips (~3–4mm). Rest before using.'] }
            ]
          },
          {
            id: 'bn-assembly',
            name: 'Bowl Assembly and Toppings',
            kind: 'assembly',
            ingredients: [
              {
                section: 'Toppings',
                items: [
                  { name: 'bean sprouts', amount: 1, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'morning glory (water spinach)', amount: 1, unit: 'cup', prep: 'blanched 30 seconds', notes: 'Sub spinach or bok choy if unavailable', optional: false, substitutions: [{ name: 'Spinach', ratio: '1:1', notes: 'Blanch even less — 10 seconds' }, { name: 'Bok choy', ratio: '1:1', notes: 'Blanch 60 seconds' }] },
                  { name: 'beef or pork meatballs', amount: 8, unit: null, prep: '', notes: 'Store-bought or homemade', optional: true, substitutions: [] },
                  { name: 'crispy pork rinds', amount: null, unit: null, prep: '', notes: 'Traditional topping — adds texture', optional: true, substitutions: [] },
                  { name: 'fresh chilies', amount: 2, unit: null, prep: 'sliced', notes: 'On the side', optional: true, substitutions: [] }
                ]
              },
              {
                section: 'Condiments (on the side)',
                items: [
                  { name: 'fish sauce', amount: null, unit: null, prep: '', notes: 'For seasoning at the table', optional: true, substitutions: [] },
                  { name: 'white sugar or maple syrup', amount: null, unit: null, prep: '', notes: 'For sweetness at the table', optional: true, substitutions: [] },
                  { name: 'white vinegar', amount: null, unit: null, prep: '', notes: 'For sourness at the table', optional: true, substitutions: [] },
                  { name: 'dried chili flakes', amount: null, unit: null, prep: '', notes: 'For heat at the table', optional: true, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Blanch noodles and greens', instructions: ['Blanch noodle portions in the hot broth or a separate pot of boiling water for 20–30 seconds. Drain into bowls. Blanch morning glory in the same water.'] },
              { order: 2, title: 'Assemble bowls', instructions: ['Add noodles to bowl. Top with meatballs (warmed in broth), morning glory, and bean sprouts. Ladle hot broth over generously.'] },
              { order: 3, title: 'Set condiment station', instructions: ['Place fish sauce, vinegar, chili flakes, and optional sweetener on the table. Boat noodles are traditionally seasoned by each person at the table. Serve with fresh chilies and crispy pork rinds on the side.'] }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Noodles (up to 1 day ahead)', items: [{ component: 'bn-noodles', step: 1 }] },
          { order: 2, label: 'Broth (can be made ahead)', items: [{ component: 'bn-broth', step: 1 }, { component: 'bn-broth', step: 2 }, { component: 'bn-broth', step: 3 }, { component: 'bn-broth', step: 4 }] },
          { order: 3, label: 'Serve', items: [{ component: 'bn-assembly', step: 1 }, { component: 'bn-assembly', step: 2 }, { component: 'bn-assembly', step: 3 }] }
        ],
        substitution_summary: {
          blood_free: 'Traditional boat noodles use pork or beef blood to thicken the broth. This version omits it entirely — the spiced stock is excellent on its own.',
          make_ahead: 'Broth can be made up to 3 days ahead and refrigerated. The flavour deepens overnight.',
          protein: 'Beef slices, pork slices, and meatballs are all traditional. Mix and match.'
        }
      },
      {
        id: 'sen-chan-pad-pu',
        name: 'Sen Chan Pad Pu (Weeknight Pad Thai-Style)',
        cuisine: 'Thai',
        version: 1,
        servings: { count: 2, note: 'One wok batch.' },
        metadata: {
          style: 'thin rice noodle stir-fry with dried chili paste, simpler than pad thai',
          diet: { vegetarian: false, vegan: false, gluten_free: true, contains_dairy: false, contains_lentils: false },
          context: 'Easier weeknight version of pad thai. Homemade dried chili paste replaces bottled nam prik pao. No egg, no tofu, no peanuts — simpler ingredient list. Part of the Thai noodle collection.'
        },
        components: [
          {
            id: 'scpp-chili-paste',
            name: 'Homemade Dried Chili Paste (Nam Prik Pao)',
            kind: 'paste',
            ingredients: [
              {
                section: 'Paste',
                items: [
                  { name: 'dried guajillo chilies', amount: 4, unit: null, prep: 'soaked in warm water 20 minutes, drained', notes: 'Arbol chilies can be subbed for more heat', optional: false, substitutions: [{ name: 'Dried arbol chilies', ratio: '3:1 guajillo:arbol', notes: 'Arbol is much hotter — use sparingly' }] },
                  { name: 'shallots', amount: 2, unit: null, prep: 'roughly chopped', notes: '', optional: false, substitutions: [] },
                  { name: 'garlic cloves', amount: 3, unit: null, prep: 'roughly chopped', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 2, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Soak and drain chilies', instructions: ['Cover dried chilies in warm water for 20 minutes until pliable. Drain, remove stems, shake out most seeds for a milder paste.'] },
              { order: 2, title: 'Blend to a paste', instructions: ['Blend soaked chilies, shallots, and garlic with a splash of water until as smooth as your blender allows.'] },
              { order: 3, title: 'Fry until dark and fragrant', instructions: ['Heat oil in a small pan over medium-low. Add paste. Fry, stirring often, until the paste darkens from bright red to deep maroon and the oil begins to separate from the solids, about 8–12 minutes. The smell should transform from raw to toasted. Cool and store refrigerated up to 2 weeks.'] }
            ]
          },
          {
            id: 'scpp-noodles',
            name: 'Homemade Thin Rice Noodles',
            kind: 'noodle',
            ingredients: [
              {
                section: 'Noodle batter',
                items: [
                  { name: 'rice flour', amount: 200, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'tapioca starch', amount: 30, unit: 'g', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'water', amount: 320, unit: 'ml', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 1, unit: 'tsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Make thin rice noodles', instructions: ['Whisk ingredients until smooth. Steam thin sheets on an oiled heatproof plate, 3–4 minutes each. Cool, oil, stack with parchment. Cut into thin strips (~3–4mm). Rest at room temperature before using.'] }
            ]
          },
          {
            id: 'scpp-stir-fry',
            name: 'Sen Chan Stir-Fry',
            kind: 'stir-fry',
            ingredients: [
              {
                section: 'Sauce',
                items: [
                  { name: 'tamarind paste (unsweetened)', amount: 1.5, unit: 'tbsp', prep: 'dissolved in 3 tbsp warm water', notes: '', optional: false, substitutions: [] },
                  { name: 'fish sauce (low sodium)', amount: 1, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'maple syrup', amount: 0.5, unit: 'tsp', prep: '', notes: 'Less than pad thai — this dish is more sour-savoury', optional: false, substitutions: [] },
                  { name: 'water', amount: 3, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'homemade dried chili paste', amount: 2, unit: 'tbsp', prep: '', notes: 'See chili paste component', optional: false, substitutions: [] }
                ]
              },
              {
                section: 'Stir-fry',
                items: [
                  { name: 'shrimp or crab', amount: 200, unit: 'g', prep: 'shrimp peeled and deveined; crab picked', notes: '', optional: false, substitutions: [{ name: 'Firm tofu', ratio: '1:1 by weight', notes: 'For a vegetarian version' }] },
                  { name: 'bean sprouts', amount: 1, unit: 'cup', prep: '', notes: '', optional: false, substitutions: [] },
                  { name: 'garlic chives', amount: 0.5, unit: 'cup', prep: 'cut into 2cm lengths', notes: '', optional: false, substitutions: [{ name: 'Green onion tops', ratio: '1:1', notes: 'Milder, widely available' }] },
                  { name: 'lime', amount: 1, unit: null, prep: 'cut into wedges', notes: 'To serve', optional: false, substitutions: [] },
                  { name: 'neutral oil', amount: 1.5, unit: 'tbsp', prep: '', notes: '', optional: false, substitutions: [] }
                ]
              }
            ],
            steps: [
              { order: 1, title: 'Mix sauce with chili paste', instructions: ['Combine tamarind water, fish sauce, maple syrup, and water. Stir in the chili paste until dissolved. Taste — should be sour-savoury with a smoky chili note.'] },
              { order: 2, title: 'Stir-fry protein', instructions: ['Heat wok on high. Add oil. Add shrimp or crab. Stir-fry until just cooked, 90 seconds for shrimp. Remove and set aside.'] },
              { order: 3, title: 'Add noodles and sauce', instructions: ['Reduce heat slightly. Add noodles and pour sauce over. Toss to coat, letting noodles absorb the sauce, about 60–90 seconds.'] },
              { order: 4, title: 'Return protein, add sprouts and chives', instructions: ['Return protein to wok. Add bean sprouts and garlic chives. Toss quickly — 20 seconds. Sprouts should stay crunchy.'] },
              { order: 5, title: 'Plate with lime', instructions: ['Plate immediately. A squeeze of lime over everything just before eating is essential.'] }
            ]
          }
        ],
        workflow: [
          { order: 1, label: 'Chili paste (make ahead, keeps 2 weeks)', items: [{ component: 'scpp-chili-paste', step: 1 }, { component: 'scpp-chili-paste', step: 2 }, { component: 'scpp-chili-paste', step: 3 }] },
          { order: 2, label: 'Noodles (up to 1 day ahead)', items: [{ component: 'scpp-noodles', step: 1 }] },
          { order: 3, label: 'Stir-fry (last minute)', items: [{ component: 'scpp-stir-fry', step: 1 }, { component: 'scpp-stir-fry', step: 2 }, { component: 'scpp-stir-fry', step: 3 }, { component: 'scpp-stir-fry', step: 4 }, { component: 'scpp-stir-fry', step: 5 }] }
        ],
        substitution_summary: {
          chili_paste: 'With homemade paste in the fridge, this becomes a very fast weeknight dish. The paste is the key prep component.',
          vegetarian: 'Replace fish sauce with soy sauce + lime. Use tofu or omit protein.',
          tamarind: 'Same as pad thai — block tamarind dissolved in warm water is best. Concentrate works at 1 tbsp.'
        }
      }
    ];