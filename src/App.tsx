import React, { useState } from 'react';
import { Copy, Check, User, PawPrint, Mountain, Building, Package, ChevronRight, ChevronLeft, Trash2, Wand2, Sparkles, AlertCircle } from 'lucide-react';

type SelectionType = 'single' | 'multiple';

interface Category {
  id: string;
  label: string;
  type: SelectionType;
  options: string[];
  dependsOn?: { categoryId: string; values: string[] };
}

const SUBJECT_TYPES = [
  { id: 'Person', icon: User, description: 'Create a human character or portrait' },
  { id: 'Animal', icon: PawPrint, description: 'Create an animal or creature' },
  { id: 'Landscape', icon: Mountain, description: 'Create a nature scene or environment' },
  { id: 'Cityscape', icon: Building, description: 'Create an urban or architectural scene' },
  { id: 'Product', icon: Package, description: 'Create a product mockup or object shot' },
];

const CATEGORY_CONFIG: Record<string, Record<string, Category[]>> = {
  Person: {
    core: [
      { id: 'gender', label: 'Gender', type: 'single', options: ['Male', 'Female', 'Androgynous'] },
      { id: 'age', label: 'Age', type: 'single', options: ['Baby', 'Child', 'Teenager', 'Young Adult', 'Adult', 'Middle-aged', 'Elderly'] },
      { id: 'race', label: 'Ethnicity/Race', type: 'single', options: ['Asian', 'Black', 'Caucasian', 'Hispanic', 'Middle Eastern', 'South Asian', 'Mixed Race', 'Native American', 'Pacific Islander'] }
    ],
    appearance: [
      { id: 'body_female', label: 'Female Body Type', type: 'single', dependsOn: { categoryId: 'gender', values: ['Female'] }, options: ['Hourglass', 'Pear-shaped', 'Petite', 'Curvy', 'Athletic', 'Slim', 'Voluptuous', 'Tall'] },
      { id: 'body_male', label: 'Male Body Type', type: 'single', dependsOn: { categoryId: 'gender', values: ['Male'] }, options: ['V-taper', 'Muscular', 'Lean', 'Dad bod', 'Stocky', 'Athletic', 'Slim', 'Broad shoulders'] },
      { id: 'body_general', label: 'Body Type', type: 'single', dependsOn: { categoryId: 'gender', values: ['Androgynous'] }, options: ['Slim', 'Athletic', 'Average', 'Plus-size', 'Petite', 'Tall'] },
      { id: 'hair_female', label: 'Female Hair Style', type: 'single', dependsOn: { categoryId: 'gender', values: ['Female'] }, options: ['Long wavy hair', 'Bob cut', 'Pixie cut', 'Braids', 'Ponytail', 'Messy bun', 'Straight long hair', 'Curly hair', 'Dreadlocks'] },
      { id: 'hair_male', label: 'Male Hair Style', type: 'single', dependsOn: { categoryId: 'gender', values: ['Male'] }, options: ['Undercut', 'Buzz cut', 'Pompadour', 'Messy short hair', 'Long hair', 'Bald', 'Fade', 'Curly hair', 'Dreadlocks'] },
      { id: 'hair_general', label: 'Hair Style', type: 'single', dependsOn: { categoryId: 'gender', values: ['Androgynous'] }, options: ['Short hair', 'Medium length hair', 'Long hair', 'Bald', 'Curly hair', 'Straight hair', 'Messy hair', 'Shaved sides'] },
      { id: 'hair_color', label: 'Hair Color', type: 'single', options: ['Black hair', 'Brown hair', 'Blonde hair', 'Red hair', 'Gray hair', 'White hair', 'Neon dyed hair', 'Pastel pink hair', 'Blue hair'] },
      { id: 'facial_hair', label: 'Facial Hair', type: 'single', dependsOn: { categoryId: 'gender', values: ['Male', 'Androgynous'] }, options: ['None', 'Stubble', 'Short beard', 'Full beard', 'Goatee', 'Mustache', 'Mutton chops'] },
      { id: 'makeup', label: 'Makeup Style', type: 'single', options: ['None', 'Natural makeup', 'Heavy makeup', 'Smokey eyes', 'Glossy lips', 'Gothic makeup', 'Cyberpunk makeup'] },
      { id: 'facial_features', label: 'Facial Features', type: 'multiple', options: ['Freckles', 'Dimples', 'High cheekbones', 'Sharp jawline', 'Scars', 'Glowing eyes', 'Heterochromia', 'Birthmark'] }
    ],
    clothing: [
      { id: 'clothing_style', label: 'Clothing Style', type: 'single', options: ['Casual', 'Formal', 'Streetwear', 'Cyberpunk', 'Intimate/Lingerie', 'Fantasy/Armor', 'Athletic/Sportswear', 'Gothic', 'Beachwear', 'Steampunk'] },
      
      { id: 'casual_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Casual'] }, options: ['T-shirt and ripped jeans', 'Oversized sweater and leggings', 'Sundress with floral print', 'Polo shirt and khaki shorts', 'Tank top and cargo pants', 'Denim overalls', 'Turtleneck and slacks', 'Crop top and high-waisted shorts', 'Flannel shirt and jeans', 'Maxi dress', 'Romper'] },
      { id: 'casual_outerwear', label: 'Outerwear', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Casual'] }, options: ['None', 'Denim jacket', 'Oversized hoodie', 'Flannel shirt', 'Cardigan', 'Leather jacket'] },
      
      { id: 'formal_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Formal'] }, options: ['Classic black tuxedo', 'Three-piece tailored suit', 'Elegant silk evening gown', 'Sleek cocktail dress', 'Pencil skirt and silk blouse', 'Double-breasted pinstripe suit', 'Velvet dinner jacket', 'Ballgown with sequins', 'White wedding dress', 'Sharp business suit'] },
      { id: 'formal_outerwear', label: 'Outerwear', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Formal'] }, options: ['None', 'Tailored overcoat', 'Fur shawl', 'Trench coat'] },

      { id: 'streetwear_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Streetwear'] }, options: ['Oversized graphic tee and baggy cargo pants', 'Techwear tactical suit', 'Matching velour tracksuit', 'Baggy hoodie and wide-leg jeans', 'Skater outfit with baggy shorts', 'Hypebeast layered outfit', 'Crop hoodie and sweatpants', 'Utility vest over long sleeve tee'] },
      { id: 'streetwear_outerwear', label: 'Outerwear', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Streetwear'] }, options: ['None', 'Puffer jacket', 'Windbreaker', 'Varsity jacket', 'Trench coat'] },

      { id: 'cyberpunk_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Cyberpunk'] }, options: ['Netrunner bodysuit', 'Tactical urban mercenary gear', 'Synthetic leather jacket and glowing pants', 'Holographic translucent dress', 'Augmented exoskeleton suit', 'Neon-lined street samurai armor', 'Tech-ninja stealth suit'] },
      { id: 'cyberpunk_outerwear', label: 'Outerwear', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Cyberpunk'] }, options: ['None', 'Neon glowing jacket', 'Transparent raincoat', 'Armored vest'] },

      { id: 'intimate_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Intimate/Lingerie'] }, options: ['Silk kimono robe', 'Lace lingerie set', 'Satin slip dress', 'Corset and matching panties', 'Cotton boxers and t-shirt', 'Briefs', 'Sheer babydoll dress', 'Fishnet bodysuit', 'Cozy flannel pajamas'] },

      { id: 'fantasy_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Fantasy/Armor'] }, options: ['Heavy plate paladin armor', 'Leather rogue tunic', 'Flowing wizard robes', 'Elegant elven dress', 'Chainmail and tabard', 'Ranger gear with cloak', 'Barbarian fur armor', 'Royal velvet robes', 'Druid leaf and bark armor'] },
      { id: 'fantasy_outerwear', label: 'Outerwear', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Fantasy/Armor'] }, options: ['None', 'Heavy cloak', 'Fur mantle', 'Mage cape'] },

      { id: 'athletic_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Athletic/Sportswear'] }, options: ['Yoga pants and sports bra', 'Running shorts and breathable tank top', 'Full matching tracksuit', 'Aerodynamic compression suit', 'Tennis skirt and polo', 'Basketball jersey and shorts', 'Gym stringer and sweatpants', 'Cycling bodysuit'] },
      { id: 'athletic_outerwear', label: 'Outerwear', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Athletic/Sportswear'] }, options: ['None', 'Windbreaker', 'Zip-up hoodie', 'Sweat jacket'] },

      { id: 'gothic_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Gothic'] }, options: ['Black lace Victorian dress', 'Leather pants and tight corset', 'Crushed velvet suit', 'Victorian mourning dress', 'Fishnet top and plaid skirt', 'Long black duster coat outfit', 'Vampiric aristocratic attire'] },
      { id: 'gothic_outerwear', label: 'Outerwear', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Gothic'] }, options: ['None', 'Velvet coat', 'Leather duster', 'Lace shawl'] },

      { id: 'beachwear_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Beachwear'] }, options: ['Two-piece string bikini', 'Board shorts', 'One-piece athletic swimsuit', 'Swim trunks and open Hawaiian shirt', 'Neoprene wetsuit', 'Crochet beach cover-up dress', 'High-waisted retro swimsuit'] },
      { id: 'beachwear_outerwear', label: 'Outerwear', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Beachwear'] }, options: ['None', 'Sarong', 'Linen cover-up', 'Open Hawaiian shirt'] },

      { id: 'steampunk_outfit', label: 'Main Outfit', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Steampunk'] }, options: ['Victorian dress with brass gears', 'Waistcoat, cravat and trousers', 'Airship explorer outfit', 'Mechanic coveralls with grease', 'Aristocratic suit with pocket watch', 'Corset dress with leather belts'] },
      { id: 'steampunk_outerwear', label: 'Outerwear', type: 'single', dependsOn: { categoryId: 'clothing_style', values: ['Steampunk'] }, options: ['None', 'Victorian tailcoat', 'Leather aviator jacket', 'Trench coat'] },

      { id: 'clothing_footwear', label: 'Footwear', type: 'single', options: ['None', 'Sneakers', 'Combat boots', 'High heels', 'Dress shoes', 'Sandals', 'Flip flops', 'Barefoot', 'Thigh-high boots', 'Oxfords'] },
      { id: 'clothing_details', label: 'Accessories', type: 'multiple', options: ['Glasses', 'Sunglasses', 'Hat', 'Scarf', 'Jewelry', 'Watch', 'Necklace', 'Earrings', 'Belt', 'Backpack', 'Gloves', 'Choker'] }
    ],
    action: [
      { id: 'pose_category', label: 'Pose Category', type: 'single', options: ['Standing', 'Sitting', 'Laying Down', 'Action/Dynamic', 'Other'] },
      { id: 'pose_standing', label: 'Standing Poses', type: 'single', dependsOn: { categoryId: 'pose_category', values: ['Standing'] }, options: ['Standing straight', 'Leaning against wall', 'Hands in pockets', 'Arms crossed', 'Hands on hips', 'Contrapposto pose', 'Looking over shoulder', 'Leaning forward', 'Posing confidently'] },
      { id: 'pose_sitting', label: 'Sitting Poses', type: 'single', dependsOn: { categoryId: 'pose_category', values: ['Sitting'] }, options: ['Sitting cross-legged on floor', 'Sitting on a chair', 'Sitting on edge of table', 'Sitting with knees to chest', 'Lounging on a sofa', 'Sitting on heels (Seiza)', 'Slouching in a chair', 'Manspreading', 'Sitting with legs crossed gracefully'] },
      { id: 'pose_laying', label: 'Laying Poses', type: 'single', dependsOn: { categoryId: 'pose_category', values: ['Laying Down'] }, options: ['Laying flat on back', 'Laying on stomach', 'Laying on side', 'Curled up in fetal position', 'Sprawled out on the floor', 'Propped up on elbows', 'Laying with one knee bent', 'Laying spread eagle'] },
      { id: 'pose_action', label: 'Action Poses', type: 'single', dependsOn: { categoryId: 'pose_category', values: ['Action/Dynamic'] }, options: ['Jumping mid-air', 'Running fast', 'Walking casually', 'Dancing gracefully', 'Fighting stance', 'Floating in mid-air', 'Stretching', 'Mid-kick', 'Punching forward', 'Dodging'] },
      { id: 'pose_other', label: 'Other Poses', type: 'single', dependsOn: { categoryId: 'pose_category', values: ['Other'] }, options: ['On all fours', 'Crawling', 'Kneeling on one knee', 'Kneeling on both knees', 'Crouching low', 'Squatting', 'Yoga pose', 'Bending over', 'Hanging upside down'] },
      { id: 'expression', label: 'Expression', type: 'single', options: ['Gentle smile', 'Wide grin', 'Serious and intense', 'Angry scowl', 'Crying tears', 'Laughing out loud', 'Surprised gasp', 'Neutral blank stare', 'Smirking playfully', 'Seductive gaze', 'Winking', 'Pouting', 'Bored', 'Terrified', 'Confused', 'Thoughtful', 'Eyes closed peacefully'] }
    ]
  },
  Animal: {
    core: [
      { id: 'animal_type', label: 'Animal Type', type: 'single', options: ['Dog', 'Cat', 'Bird', 'Horse', 'Bear', 'Big Cat', 'Wolf/Fox', 'Fish/Marine', 'Reptile', 'Mythical'] },
      
      { id: 'breed_dog', label: 'Dog Breed', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Dog'] }, options: ['Golden Retriever', 'Siberian Husky', 'German Shepherd', 'Bulldog', 'Poodle', 'Beagle', 'Doberman', 'Corgi', 'Shiba Inu', 'Pug', 'Dalmatian', 'Rottweiler'] },
      { id: 'breed_cat', label: 'Cat Breed', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Cat'] }, options: ['Persian', 'Maine Coon', 'Siamese', 'Sphynx', 'Bengal', 'British Shorthair', 'Scottish Fold', 'Ragdoll', 'Stray/Alley Cat', 'Black Cat'] },
      { id: 'breed_bird', label: 'Bird Species', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Bird'] }, options: ['Bald Eagle', 'Snowy Owl', 'Parrot/Macaw', 'Peacock', 'Crow/Raven', 'Hummingbird', 'Swan', 'Penguin', 'Pigeon', 'Flamingo', 'Hawk', 'Sparrow'] },
      { id: 'breed_horse', label: 'Horse Breed', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Horse'] }, options: ['Arabian', 'Clydesdale', 'Mustang', 'Thoroughbred', 'Appaloosa', 'Pony', 'Zebra'] },
      { id: 'breed_bear', label: 'Bear Species', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Bear'] }, options: ['Grizzly Bear', 'Polar Bear', 'Black Bear', 'Panda', 'Red Panda', 'Sun Bear'] },
      { id: 'breed_bigcat', label: 'Big Cat Species', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Big Cat'] }, options: ['Lion', 'Tiger', 'Leopard', 'Snow Leopard', 'Black Panther', 'Cheetah', 'Cougar/Mountain Lion', 'Jaguar'] },
      { id: 'breed_wolffox', label: 'Wolf/Fox Species', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Wolf/Fox'] }, options: ['Timber Wolf', 'Arctic Wolf', 'Red Fox', 'Arctic Fox', 'Fennec Fox', 'Coyote', 'Dire Wolf'] },
      { id: 'breed_marine', label: 'Marine Species', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Fish/Marine'] }, options: ['Great White Shark', 'Dolphin', 'Orca', 'Koi Fish', 'Betta Fish', 'Jellyfish', 'Octopus', 'Sea Turtle', 'Manta Ray', 'Seahorse'] },
      { id: 'breed_reptile', label: 'Reptile Species', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Reptile'] }, options: ['Python', 'Cobra', 'Chameleon', 'Iguana', 'Komodo Dragon', 'Crocodile', 'Gecko', 'Tortoise'] },
      { id: 'breed_mythical', label: 'Mythical Species', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Mythical'] }, options: ['Fire Dragon', 'Ice Dragon', 'Unicorn', 'Pegasus', 'Griffin', 'Phoenix', 'Kitsune', 'Cerberus', 'Kraken'] }
    ],
    appearance: [
      { id: 'animal_color', label: 'Color/Pattern', type: 'multiple', options: ['White', 'Black', 'Brown', 'Golden', 'Spotted', 'Striped', 'Calico', 'Tuxedo', 'Albino', 'Melanistic', 'Neon/Bioluminescent', 'Iridescent'] },
      
      { id: 'feat_mammal', label: 'Physical Features', type: 'multiple', dependsOn: { categoryId: 'animal_type', values: ['Dog', 'Cat', 'Horse', 'Bear', 'Big Cat', 'Wolf/Fox'] }, options: ['Fluffy', 'Sleek', 'Muscular', 'Scars', 'Long tail', 'Short tail', 'Floppy ears', 'Pointy ears', 'Thick winter fur', 'Wet fur', 'Wearing a collar'] },
      { id: 'feat_bird', label: 'Physical Features', type: 'multiple', dependsOn: { categoryId: 'animal_type', values: ['Bird'] }, options: ['Vibrant feathers', 'Large wingspan', 'Sharp talons', 'Curved beak', 'Iridescent plumage', 'Fluffed up feathers', 'Long tail feathers'] },
      { id: 'feat_marine', label: 'Physical Features', type: 'multiple', dependsOn: { categoryId: 'animal_type', values: ['Fish/Marine'] }, options: ['Glistening scales', 'Translucent fins', 'Sharp teeth', 'Bioluminescent spots', 'Sleek hydrodynamic body', 'Long tentacles', 'Spiky fins'] },
      { id: 'feat_reptile', label: 'Physical Features', type: 'multiple', dependsOn: { categoryId: 'animal_type', values: ['Reptile'] }, options: ['Rough scales', 'Forked tongue', 'Spiked crest', 'Slitted eyes', 'Camouflaged skin', 'Armor-like plates', 'Long shedding skin'] },
      { id: 'feat_mythical', label: 'Physical Features', type: 'multiple', dependsOn: { categoryId: 'animal_type', values: ['Mythical'] }, options: ['Glowing eyes', 'Majestic horns', 'Large dragon wings', 'Ethereal aura', 'Scales of gold', 'Flaming mane', 'Shadowy tendrils'] }
    ],
    action: [
      { id: 'act_mammal', label: 'Pose/Action', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Dog', 'Cat', 'Horse', 'Bear', 'Big Cat', 'Wolf/Fox'] }, options: ['Sitting', 'Standing', 'Running fast', 'Jumping', 'Sleeping curled up', 'Roaring/Barking', 'Howling at the moon', 'Hunting', 'Stalking prey', 'Playing', 'Laying down', 'Panting', 'Begging'] },
      { id: 'act_bird', label: 'Pose/Action', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Bird'] }, options: ['Flying high', 'Perched on a branch', 'Swooping down', 'Nesting', 'Singing/Calling', 'Taking off', 'Soaring gracefully', 'Diving for prey'] },
      { id: 'act_marine', label: 'Pose/Action', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Fish/Marine'] }, options: ['Swimming gracefully', 'Breaching the surface', 'Hunting underwater', 'Floating', 'Schooling', 'Hiding in coral', 'Leaping out of water', 'Deep sea diving'] },
      { id: 'act_reptile', label: 'Pose/Action', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Reptile'] }, options: ['Basking in the sun', 'Slithering', 'Striking/Biting', 'Climbing a tree', 'Camouflaged and still', 'Swimming', 'Coiled up'] },
      { id: 'act_mythical', label: 'Pose/Action', type: 'single', dependsOn: { categoryId: 'animal_type', values: ['Mythical'] }, options: ['Breathing fire', 'Flying majestically', 'Guarding treasure', 'Rearing up', 'Casting magic', 'Roaring at the sky', 'Emerging from shadows'] }
    ]
  },
  Landscape: {
    core: [
      { id: 'biome', label: 'Biome', type: 'single', options: ['Forest', 'Desert', 'Mountain', 'Beach', 'Tundra', 'Swamp', 'Jungle', 'Plains', 'Canyon', 'Island'] },
      { id: 'weather', label: 'Weather', type: 'single', options: ['Sunny', 'Rainy', 'Snowy', 'Foggy', 'Cloudy', 'Stormy', 'Clear sky', 'Overcast'] },
      { id: 'time', label: 'Time of Day', type: 'single', options: ['Morning', 'Noon', 'Afternoon', 'Golden Hour', 'Sunset', 'Twilight', 'Night', 'Midnight', 'Dawn'] }
    ]
  },
  Cityscape: {
    core: [
      { id: 'city_style', label: 'City Style', type: 'single', options: ['Modern Metropolis', 'Cyberpunk', 'Steampunk', 'Historical', 'Futuristic', 'Ruined/Apocalyptic', 'Fantasy Village', 'Sci-fi Colony'] },
      { id: 'weather', label: 'Weather', type: 'single', options: ['Sunny', 'Rainy', 'Snowy', 'Foggy', 'Cloudy', 'Stormy', 'Clear sky', 'Smoggy'] },
      { id: 'time', label: 'Time of Day', type: 'single', options: ['Morning', 'Noon', 'Afternoon', 'Golden Hour', 'Sunset', 'Twilight', 'Night', 'Midnight'] }
    ]
  },
  Product: {
    core: [
      { id: 'product_type', label: 'Product Type', type: 'single', options: ['Perfume bottle', 'Sneakers', 'Watch', 'Gadget', 'Furniture', 'Car', 'Food/Beverage', 'Cosmetics', 'Jewelry'] }
    ],
    appearance: [
      { id: 'material', label: 'Material', type: 'multiple', options: ['Glass', 'Metal', 'Wood', 'Plastic', 'Leather', 'Fabric', 'Matte finish', 'Glossy finish', 'Ceramic', 'Gold', 'Silver'] }
    ],
    action: [
      { id: 'placement', label: 'Placement', type: 'single', options: ['On a pedestal', 'Floating in mid-air', 'On a table', 'In nature', 'Studio setup', 'Held in hand'] }
    ]
  }
};

const UNIVERSAL_CATEGORIES: Record<string, Category[]> = {
  environment: [
    { id: 'env_setting', label: 'Setting', type: 'single', options: ['Studio', 'Indoor', 'Nature', 'Urban', 'Sci-fi/Fantasy'] },
    
    // --- STUDIO ---
    { id: 'env_studio_type', label: 'Studio Style', type: 'single', dependsOn: { categoryId: 'env_setting', values: ['Studio'] }, options: ['Backdrop', 'Set Design', 'Lighting Focus'] },
    { id: 'env_studio_backdrop', label: 'Backdrop', type: 'single', dependsOn: { categoryId: 'env_studio_type', values: ['Backdrop'] }, options: ['White seamless paper', 'Black studio backdrop', 'Grey seamless paper', 'Green screen', 'Textured canvas backdrop'] },
    { id: 'env_studio_set', label: 'Set Design', type: 'single', dependsOn: { categoryId: 'env_studio_type', values: ['Set Design'] }, options: ['Minimalist concrete studio', 'Vintage photography studio', 'Boho styled set', 'Industrial loft studio'] },
    { id: 'env_studio_lighting', label: 'Lighting Focus', type: 'single', dependsOn: { categoryId: 'env_studio_type', values: ['Lighting Focus'] }, options: ['Color gel lighting setup', 'Neon lit dark room', 'High-key lighting setup', 'Low-key dramatic setup'] },

    // --- INDOOR ---
    { id: 'env_indoor_type', label: 'Indoor Type', type: 'single', dependsOn: { categoryId: 'env_setting', values: ['Indoor'] }, options: ['House/Apartment', 'Hotel', 'Office/Corporate', 'Commercial/Retail', 'Industrial', 'Public/Cultural', 'Sports/Fitness'] },
    { id: 'env_indoor_house', label: 'House/Apartment', type: 'single', dependsOn: { categoryId: 'env_indoor_type', values: ['House/Apartment'] }, options: ['Living room', 'Bedroom', 'Bathroom', 'Bathtub', 'Shower stall', 'Kitchen', 'Dining room', 'Home office', 'Basement', 'Attic', 'Staircase', 'Hallway', 'Walk-in closet', 'Balcony'] },
    { id: 'env_indoor_hotel', label: 'Hotel', type: 'single', dependsOn: { categoryId: 'env_indoor_type', values: ['Hotel'] }, options: ['Luxury hotel suite', 'Hotel lobby', 'Hotel corridor', 'Motel room', 'Hotel balcony'] },
    { id: 'env_indoor_office', label: 'Office/Corporate', type: 'single', dependsOn: { categoryId: 'env_indoor_type', values: ['Office/Corporate'] }, options: ['Open plan office', 'Executive corner office', 'Cubicle', 'Boardroom', 'Break room', 'Office elevator'] },
    { id: 'env_indoor_commercial', label: 'Commercial/Retail', type: 'single', dependsOn: { categoryId: 'env_indoor_type', values: ['Commercial/Retail'] }, options: ['Vintage cafe', 'Neon-lit bar', 'Nightclub dancefloor', 'Restaurant dining area', 'Boutique clothing store', 'Supermarket aisle', 'Laundromat', 'Shopping mall'] },
    { id: 'env_indoor_industrial', label: 'Industrial', type: 'single', dependsOn: { categoryId: 'env_indoor_type', values: ['Industrial'] }, options: ['Abandoned warehouse', 'Active factory floor', 'Server room', 'Boiler room', 'Auto repair shop'] },
    { id: 'env_indoor_public', label: 'Public/Cultural', type: 'single', dependsOn: { categoryId: 'env_indoor_type', values: ['Public/Cultural'] }, options: ['Grand library', 'Museum exhibition hall', 'Art gallery', 'Movie theater', 'Hospital room', 'School classroom', 'Church/Cathedral'] },
    { id: 'env_indoor_sports', label: 'Sports/Fitness', type: 'single', dependsOn: { categoryId: 'env_indoor_type', values: ['Sports/Fitness'] }, options: ['Boxing gym', 'Yoga studio', 'Indoor swimming pool', 'Locker room', 'Basketball court'] },

    // --- NATURE ---
    { id: 'env_nature_type', label: 'Nature Type', type: 'single', dependsOn: { categoryId: 'env_setting', values: ['Nature'] }, options: ['Forest/Woodland', 'Water/Coastal', 'Mountain/Rocky', 'Desert/Arid', 'Plains/Fields', 'Extreme/Other'] },
    { id: 'env_nature_forest', label: 'Forest/Woodland', type: 'single', dependsOn: { categoryId: 'env_nature_type', values: ['Forest/Woodland'] }, options: ['Deep misty pine forest', 'Sunlit deciduous forest', 'Bamboo forest', 'Tropical rainforest', 'Autumn forest with red leaves', 'Spooky dead forest'] },
    { id: 'env_nature_water', label: 'Water/Coastal', type: 'single', dependsOn: { categoryId: 'env_nature_type', values: ['Water/Coastal'] }, options: ['Sunny tropical beach', 'Rocky coastline', 'Majestic cascading waterfall', 'Calm lake', 'Raging river', 'Swamp with glowing plants', 'Underwater coral reef'] },
    { id: 'env_nature_mountain', label: 'Mountain/Rocky', type: 'single', dependsOn: { categoryId: 'env_nature_type', values: ['Mountain/Rocky'] }, options: ['Snowy mountain peak', 'Dark mysterious cave', 'Steep cliff edge', 'Rocky canyon', 'Crystal cavern'] },
    { id: 'env_nature_desert', label: 'Desert/Arid', type: 'single', dependsOn: { categoryId: 'env_nature_type', values: ['Desert/Arid'] }, options: ['Endless sand dunes', 'Rocky desert', 'Oasis', 'Salt flat'] },
    { id: 'env_nature_plains', label: 'Plains/Fields', type: 'single', dependsOn: { categoryId: 'env_nature_type', values: ['Plains/Fields'] }, options: ['Lush green valley', 'Wheat field', 'Flower meadow', 'Savanna'] },
    { id: 'env_nature_extreme', label: 'Extreme/Other', type: 'single', dependsOn: { categoryId: 'env_nature_type', values: ['Extreme/Other'] }, options: ['Volcanic landscape', 'Glacier/Ice cave', 'Tundra'] },

    // --- URBAN ---
    { id: 'env_urban_type', label: 'Urban Type', type: 'single', dependsOn: { categoryId: 'env_setting', values: ['Urban'] }, options: ['Street Level', 'High Altitude', 'Underground/Transit', 'Residential', 'Industrial/Gritty'] },
    { id: 'env_urban_street', label: 'Street Level', type: 'single', dependsOn: { categoryId: 'env_urban_type', values: ['Street Level'] }, options: ['Neon-lit rainy street', 'Busy Tokyo intersection', 'Historic European cobblestone street', 'Quiet suburban neighborhood', 'Bustling outdoor market', 'Dark gritty alleyway'] },
    { id: 'env_urban_high', label: 'High Altitude', type: 'single', dependsOn: { categoryId: 'env_urban_type', values: ['High Altitude'] }, options: ['High skyscraper rooftop', 'Balcony overlooking city', 'Glass bridge', 'Helipad'] },
    { id: 'env_urban_transit', label: 'Underground/Transit', type: 'single', dependsOn: { categoryId: 'env_urban_type', values: ['Underground/Transit'] }, options: ['Underground subway station', 'Inside a subway car', 'Train station platform', 'Bus stop at night', 'Airport terminal'] },
    { id: 'env_urban_residential', label: 'Residential', type: 'single', dependsOn: { categoryId: 'env_urban_type', values: ['Residential'] }, options: ['Apartment balcony', 'Fire escape', 'Suburban driveway', 'Backyard patio'] },
    { id: 'env_urban_industrial', label: 'Industrial/Gritty', type: 'single', dependsOn: { categoryId: 'env_urban_type', values: ['Industrial/Gritty'] }, options: ['Graffiti-covered skatepark', 'Abandoned industrial zone', 'Construction site', 'Under a bridge/overpass', 'Junkyard'] },

    // --- SCI-FI / FANTASY ---
    { id: 'env_scifi_type', label: 'Sci-fi/Fantasy Type', type: 'single', dependsOn: { categoryId: 'env_setting', values: ['Sci-fi/Fantasy'] }, options: ['Sci-Fi Interior', 'Sci-Fi Exterior', 'Fantasy Interior', 'Fantasy Exterior', 'Steampunk/Cyberpunk'] },
    { id: 'env_scifi_interior', label: 'Sci-Fi Interior', type: 'single', dependsOn: { categoryId: 'env_scifi_type', values: ['Sci-Fi Interior'] }, options: ['Sleek spaceship bridge', 'Cryo-sleep chamber', 'Futuristic clean laboratory', 'Dyson sphere interior', 'Space station corridor'] },
    { id: 'env_scifi_exterior', label: 'Sci-Fi Exterior', type: 'single', dependsOn: { categoryId: 'env_scifi_type', values: ['Sci-Fi Exterior'] }, options: ['Barren alien planet surface', 'Futuristic mega-city skyline', 'Underwater domed city', 'Interdimensional void', 'Asteroid mining colony'] },
    { id: 'env_fantasy_interior', label: 'Fantasy Interior', type: 'single', dependsOn: { categoryId: 'env_scifi_type', values: ['Fantasy Interior'] }, options: ['Floating magic academy', 'Dragon hoard cave', 'Medieval throne room', 'Alchemist laboratory', 'Dungeon cell'] },
    { id: 'env_fantasy_exterior', label: 'Fantasy Exterior', type: 'single', dependsOn: { categoryId: 'env_scifi_type', values: ['Fantasy Exterior'] }, options: ['Elven tree city', 'Ruined castle', 'Enchanted glowing forest', 'Floating islands', 'Crystal spire'] },
    { id: 'env_scifi_punk', label: 'Steampunk/Cyberpunk', type: 'single', dependsOn: { categoryId: 'env_scifi_type', values: ['Steampunk/Cyberpunk'] }, options: ['Gritty cyberpunk city streets', 'Neon-lit noodle stand', 'Steampunk brass laboratory', 'Airship deck', 'Post-apocalyptic ruins'] }
  ],
  style: [
    { id: 'style_ratio', label: 'Aspect Ratio', type: 'single', options: ['1:1 (Square)', '16:9 (Widescreen)', '9:16 (Vertical/Reels)', '4:3 (Standard Photography)', '3:4 (Vertical Photography)', '21:9 (Cinematic Ultrawide)', '3:2 (Classic 35mm)', '2:3 (Vertical 35mm)', '5:4 (Large Format)', '4:5 (Instagram Portrait)'] },
    { id: 'style_medium', label: 'Medium', type: 'single', options: ['Photograph', 'Oil Painting', 'Digital Art', 'Watercolor', '3D Render', 'Anime Style', 'Cinematic', 'Pencil Sketch', 'Polaroid', 'Comic Book Style', 'Concept Art'] },
    { id: 'style_shot_type', label: 'Shot Type (Distance)', type: 'single', options: ['Extreme close-up', 'Close-up shot', 'Medium shot', 'Cowboy shot', 'Full body shot', 'Wide angle shot', 'Establishing shot', 'Macro photography', 'Drone view'] },
    { id: 'style_camera_vertical', label: 'Vertical Camera Angle', type: 'single', options: ['Eye level', 'High angle', 'Low angle', "Bird's eye view", "Worm's eye view", 'Top-down view', 'Dutch angle / Tilted'] },
    { id: 'style_camera_horizontal', label: 'Horizontal Camera Angle', type: 'single', options: ['Front view', '3/4 view', 'Side profile', 'Back view', 'Over the shoulder shot', 'Point of view (POV)'] },
    { id: 'style_lighting', label: 'Lighting', type: 'multiple', options: ['Cinematic lighting', 'Natural sunlight', 'Golden hour', 'Neon lights', 'Volumetric lighting', 'Studio lighting', 'Rembrandt lighting', 'Harsh shadows', 'Soft diffused light', 'Backlit'] },
    { id: 'style_color', label: 'Color Grading', type: 'single', options: ['Vibrant colors', 'Muted tones', 'Black and white', 'Sepia', 'Cyberpunk neon palette', 'Pastel colors', 'High contrast', 'Vintage film look', 'Monochromatic'] },
    { id: 'style_modifiers', label: 'Modifiers', type: 'multiple', options: ['Highly detailed', '8k resolution', 'Masterpiece', 'Unreal Engine 5 render', 'Sharp focus', 'Depth of field', 'Award winning', 'Hyperrealistic'] }
  ]
};

export default function App() {
  const [basePrompt, setBasePrompt] = useState('');
  const [mainSubject, setMainSubject] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({});
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Generate dynamic steps based on selected subject
  const getSteps = () => {
    const base = [{ id: 'subject', label: 'Subject Type' }];
    if (!mainSubject) return base;

    const config = CATEGORY_CONFIG[mainSubject];
    if (config?.core?.length) base.push({ id: 'core', label: 'Core Details' });
    if (config?.appearance?.length) base.push({ id: 'appearance', label: 'Appearance' });
    if (config?.clothing?.length) base.push({ id: 'clothing', label: 'Clothing & Accessories' });
    if (config?.action?.length) base.push({ id: 'action', label: 'Action & Pose' });
    
    // Skip environment for Landscape and Cityscape as they ARE the environment
    if (mainSubject !== 'Landscape' && mainSubject !== 'Cityscape') {
      base.push({ id: 'environment', label: 'Environment & Location' });
    }
    
    base.push({ id: 'style', label: 'Camera, Lighting & Style' });
    return base;
  };

  const steps = getSteps();

  const handleSubjectSelect = (subjectId: string) => {
    if (mainSubject !== subjectId) {
      setMainSubject(subjectId);
      setSelectedOptions({});
      setCurrentStepIndex(1); // Auto advance to next step
    }
  };

  const toggleOption = (categoryId: string, option: string, isSingle: boolean) => {
    setSelectedOptions(prev => {
      const current = prev[categoryId] || [];
      if (isSingle) {
        return { ...prev, [categoryId]: current.includes(option) ? [] : [option] };
      } else {
        return {
          ...prev,
          [categoryId]: current.includes(option)
            ? current.filter(o => o !== option)
            : [...current, option]
        };
      }
    });
  };

  const clearAll = () => {
    setBasePrompt('');
    setMainSubject(null);
    setSelectedOptions({});
    setCurrentStepIndex(0);
  };

  const getFinalPrompt = () => {
    const parts = [basePrompt.trim()];
    
    // Gather options in the logical order of the steps
    steps.forEach(step => {
      if (step.id === 'subject') return;
      
      let categories: Category[] = [];
      if (step.id === 'environment' || step.id === 'style') {
        categories = UNIVERSAL_CATEGORIES[step.id] || [];
      } else if (mainSubject) {
        categories = CATEGORY_CONFIG[mainSubject]?.[step.id] || [];
      }

      // Filter categories based on dependency rules
      const visibleCategories = categories.filter(cat => {
        if (!cat.dependsOn) return true;
        const selectedValues = selectedOptions[cat.dependsOn.categoryId] || [];
        return cat.dependsOn.values.some(v => selectedValues.includes(v));
      });

      visibleCategories.forEach(cat => {
        const opts = selectedOptions[cat.id];
        if (opts && opts.length > 0) {
          const validOpts = opts.filter(o => o !== 'None');
          if (validOpts.length > 0) {
            parts.push(...validOpts);
          }
        }
      });
    });

    return parts.filter(Boolean).join(', ');
  };

  const finalPrompt = getFinalPrompt();

  const handleCopy = async () => {
    if (!finalPrompt) return;
    try {
      await navigator.clipboard.writeText(finalPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const renderStepContent = () => {
    const step = steps[currentStepIndex];
    
    if (!step) return null;

    if (step.id === 'subject') {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SUBJECT_TYPES.map(sub => {
            const Icon = sub.icon;
            const isSelected = mainSubject === sub.id;
            return (
              <button
                key={sub.id}
                onClick={() => handleSubjectSelect(sub.id)}
                className={`p-4 rounded-xl border text-left transition-all flex items-start gap-4 ${
                  isSelected 
                    ? 'bg-indigo-500/10 border-indigo-500/50 ring-1 ring-indigo-500/50 shadow-[0_0_15px_rgba(99,102,241,0.1)]' 
                    : 'bg-zinc-900 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800/50'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-indigo-500/20 text-indigo-400' : 'bg-zinc-800 text-zinc-400'}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className={`font-semibold ${isSelected ? 'text-indigo-300' : 'text-zinc-200'}`}>{sub.id}</h3>
                  <p className="text-xs text-zinc-500 mt-1">{sub.description}</p>
                </div>
              </button>
            )
          })}
        </div>
      );
    }

    let categories: Category[] = [];
    if (step.id === 'environment' || step.id === 'style') {
      categories = UNIVERSAL_CATEGORIES[step.id] || [];
    } else if (mainSubject) {
      categories = CATEGORY_CONFIG[mainSubject]?.[step.id] || [];
    }

    // Filter categories based on dependency rules
    const visibleCategories = categories.filter(cat => {
      if (!cat.dependsOn) return true;
      const selectedValues = selectedOptions[cat.dependsOn.categoryId] || [];
      return cat.dependsOn.values.some(v => selectedValues.includes(v));
    });

    if (visibleCategories.length === 0) {
      // Show helper message if dependencies aren't met
      let message = "Please select options in previous steps to unlock these details.";
      if (step.id === 'appearance') message = "Please select a Gender in the Core Details step to see specific appearance options.";
      if (step.id === 'clothing') message = "Please select a Clothing Style above to see specific clothing items.";

      return (
        <div className="flex flex-col items-center justify-center h-48 text-zinc-500 space-y-3 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800">
           <AlertCircle className="w-8 h-8 opacity-50" />
           <p className="text-sm">{message}</p>
        </div>
      );
    }

    return (
      <div className="space-y-8">
        {visibleCategories.map(cat => (
          <div key={cat.id} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-zinc-200">{cat.label}</h3>
              <span className="text-xs text-zinc-500 bg-zinc-800/50 px-2 py-1 rounded-md border border-zinc-800">
                {cat.type === 'single' ? 'Select one' : 'Select multiple'}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.options.map(opt => {
                const isSelected = (selectedOptions[cat.id] || []).includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleOption(cat.id, opt, cat.type === 'single')}
                    className={`px-4 py-2 rounded-xl text-sm transition-all border ${
                      isSelected
                        ? 'bg-indigo-500/20 border-indigo-500/50 text-indigo-300 shadow-[0_0_10px_rgba(99,102,241,0.1)]'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300 hover:bg-zinc-800/50'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-500 p-1.5 rounded-lg">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">PromptBuilder</h1>
          </div>
          <div className="text-sm text-zinc-400 hidden sm:block">
            Multi-Stage AI Prompt Generator
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Sidebar - Stepper */}
          <div className="lg:col-span-3 space-y-2">
            <h2 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4 px-3">Steps</h2>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 gap-2 hide-scrollbar">
              {steps.map((step, index) => {
                const isActive = currentStepIndex === index;
                const isPast = currentStepIndex > index;
                const isDisabled = index > 0 && !mainSubject;
                
                return (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStepIndex(index)}
                    disabled={isDisabled}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all whitespace-nowrap lg:whitespace-normal flex-shrink-0 text-left ${
                      isActive 
                        ? 'bg-indigo-500/10 text-indigo-400 ring-1 ring-indigo-500/20' 
                        : isPast
                          ? 'text-zinc-300 hover:bg-zinc-800/50'
                          : isDisabled
                            ? 'text-zinc-600 cursor-not-allowed'
                            : 'text-zinc-400 hover:bg-zinc-800/50'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 ${
                      isActive ? 'bg-indigo-500 text-white' : isPast ? 'bg-zinc-700 text-zinc-300' : 'bg-zinc-800 text-zinc-500'
                    }`}>
                      {isPast ? <Check className="w-3 h-3" /> : index + 1}
                    </div>
                    <span className="flex-1">{step.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Middle Content - Options */}
          <div className="lg:col-span-6 space-y-6">
            {/* Base Prompt Input */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-1 focus-within:ring-2 focus-within:ring-indigo-500/50 focus-within:border-indigo-500/50 transition-all">
              <textarea
                value={basePrompt}
                onChange={(e) => setBasePrompt(e.target.value)}
                placeholder="Enter your base idea here... (e.g., A portrait of a warrior, A futuristic car)"
                className="w-full bg-transparent border-none resize-none focus:ring-0 text-zinc-200 placeholder:text-zinc-600 p-4 min-h-[80px]"
              />
            </div>

            {/* Step Content Area */}
            <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-6 min-h-[400px] flex flex-col">
              <h2 className="text-xl font-bold text-zinc-100 mb-6 flex items-center gap-2">
                {steps[currentStepIndex]?.label}
              </h2>
              
              <div className="flex-1">
                {renderStepContent()}
              </div>

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-zinc-800/50">
                <button
                  onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentStepIndex === 0}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentStepIndex === 0 
                      ? 'text-zinc-600 cursor-not-allowed' 
                      : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back
                </button>
                
                <button
                  onClick={() => setCurrentStepIndex(prev => Math.min(steps.length - 1, prev + 1))}
                  disabled={currentStepIndex === steps.length - 1 || (!mainSubject && currentStepIndex === 0)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentStepIndex === steps.length - 1 || (!mainSubject && currentStepIndex === 0)
                      ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed' 
                      : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                  }`}
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Result */}
          <div className="lg:col-span-3">
            <div className="sticky top-24 space-y-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden flex flex-col h-[400px]">
                <div className="bg-zinc-950/50 px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                  <h3 className="font-medium text-sm text-zinc-300">Final Prompt</h3>
                  <button 
                    onClick={clearAll}
                    className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear All
                  </button>
                </div>
                
                <div className="p-4 flex-1 overflow-y-auto">
                  {finalPrompt ? (
                    <p className="text-zinc-300 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                      {finalPrompt}
                    </p>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-3">
                      <Sparkles className="w-8 h-8 opacity-20" />
                      <p className="text-sm text-center px-4">Select a subject type to start building your prompt.</p>
                    </div>
                  )}
                </div>

                <div className="p-4 bg-zinc-950/50 border-t border-zinc-800">
                  <button
                    onClick={handleCopy}
                    disabled={!finalPrompt}
                    className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${
                      !finalPrompt 
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                        : copied
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50'
                          : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25'
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Prompt
                      </>
                    )}
                  </button>
                </div>
              </div>
              
              <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
                <h4 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">How it works</h4>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  The options adapt based on your chosen subject. Go through the steps to layer details, and they will be automatically combined into a cohesive prompt.
                </p>
              </div>
            </div>
          </div>

        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
