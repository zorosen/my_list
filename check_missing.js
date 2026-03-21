const fs = require('fs');
const path = require('path');

const libraryPath = '/home/senpai/Documents/trae_projects/mylist/Anime_Library';
const files = new Set(fs.readdirSync(libraryPath).map(f => f.toLowerCase()));

const seed = [
  ['A Couple of Cuckoos','Romance'], ['Akame ga Kill','Action'], ['Attack on Titan','Action'], 
  ['Another','Horror'], ['Assassination Classroom','Action'], ['A Sister\'s All You Need','Slice of Life'], 
  ['A Day Before Us','Romance'], ['Accel World','Sci-Fi'], ['Aoashi','Sports'], ['Anohana','Drama'], 
  ['Akebi\'s Sailor Uniform','Slice of Life'], ['Akudama Drive','Sci-Fi'], ['After the Rain','Romance'], 
  ['Angels of Death','Horror'], ['A Returner\'s Magic Should Be Special','Fantasy'], ['Ajin','Supernatural'], 
  ['Bleach','Action'], ['Boruto','Action'], ['Black Clover','Action'], ['Blue Lock','Sports'], 
  ['Bunny Girl Senpai','Romance'], ['Bottom-Tier Character Tomozaki','Slice of Life'], ['Beastars','Drama'], 
  ['Boogiepop and Others','Psychological'], ['Buddy Daddies','Action'], ['Berserk','Action'], 
  ['Bungou Stray Dogs','Action'], ['Chainsaw Man','Action'], ['Classroom of the Elite','Psychological'], 
  ['Cyberpunk: Edgerunners','Sci-Fi'], ['Code Geass','Sci-Fi'], ['Clannad','Drama'], ['Domestic Girlfriend','Romance'], 
  ['Death Note','Psychological'], ['Demon Slayer','Action'], ['Daily Lives of High School Boys','Comedy'], 
  ['Dr. Stone','Adventure'], ['Darker than Black','Supernatural'], ['Darling in the FranXX','Sci-Fi'], 
  ['Darwin\'s Game','Action'], ['Dororo','Action'], ['Dungeon Meshi','Adventure'], ['Dandadan','Supernatural'], 
  ['Dragon Ball Z','Action'], ['Erased','Mystery'], ['Eden\'s Zero','Adventure'], ['Fairy Tail','Action'], 
  ['Food Wars!','Slice of Life'], ['Fruits Basket','Romance'], ['Fire Force','Action'], 
  ['Farming Life in Another World','Isekai'], ['Fullmetal Alchemist Brotherhood','Action'], ['Fighting Spirit','Sports'], 
  ['Golden Boy','Comedy'], ['Girlfriend Girlfriend','Romance'], ['Gintama','Comedy'], ['Golden Time','Romance'], 
  ['Goblin Slayer','Action'], ['Great Teacher Onizuka','Comedy'], ['Great Pretender','Mystery'], 
  ['High School DxD','Action'], ['Hunter x Hunter','Action'], ['Haikyuu!!','Sports'], 
  ['How NOT to Summon a Demon Lord','Isekai'], ['Hell\'s Paradise','Action'], ['Horimiya','Romance'], 
  ['In This Corner of the World','Drama'], ['I\'m Standing on a Million Lives','Isekai'], 
  ['In Another World with My Smartphone','Isekai'], ['I\'ve Been Killing Slimes for 300 Years','Isekai'], 
  ['Jujutsu Kaisen','Action'], ['JoJo\'s Bizarre Adventure','Action'], ['Kaguya-sama Love is War','Romance'], 
  ['Kizumonogatari','Supernatural'], ['KonoSuba','Isekai'], ['Komi Can\'t Communicate','Romance'], 
  ['Kakegurui','Psychological'], ['Kakushigoto','Slice of Life'], ['Kingdom','Action'], ['Kids on the Slope','Drama'], 
  ['Link Click','Mystery'], ['Lookism','Action'], ['Mashle: Magic and Muscles','Action'], ['Monster','Psychological'], 
  ['My Life as Inukai-san\'s Dog','Romance'], ['Mushoku Tensei','Isekai'], ['Mob Psycho 100','Supernatural'], 
  ['Masamune-kun\'s Revenge','Romance'], ['My Isekai Life','Isekai'], ['My Tiny Senpai','Romance'], 
  ['More than a Married Couple But Not Lovers','Romance'], ['My Unique Skill Makes Me OP Even at Level 1','Isekai'], 
  ['My Dress-Up Darling','Romance'], ['No Game No Life','Isekai'], ['Noragami','Supernatural'], 
  ['Neon Genesis Evangelion','Sci-Fi'], ['Nisekoi','Romance'], ['Naruto','Action'], ['Naruto Shippuden','Action'], 
  ['Nana','Drama'], ['Nichijou','Comedy'], ['One Piece','Adventure'], ['One Punch Man','Action'], 
  ['Overlord','Isekai'], ['Oshi no Ko','Drama'], ['Orange','Drama'], ['OreGairu','Romance'], 
  ['Outlaw Star','Sci-Fi'], ['Parasyte: The Maxim','Horror'], ['Psycho-Pass','Sci-Fi'], ['Prison School','Comedy'], 
  ['Platinum End','Psychological'], ['Pokemon','Adventure'], ['Puella Magi Madoka Magica','Psychological'], 
  ['The Quintessential Quintuplets','Romance'], ['Re:Zero','Isekai'], ['Rurouni Kenshin','Action'], 
  ['Rent-a-Girlfriend','Romance'], ['Rascal Does Not Dream of Bunny Girl Senpai','Romance'], 
  ['Record of Ragnarok','Action'], ['Rainbow','Drama'], ['Steins;Gate','Sci-Fi'], ['Sword Art Online','Isekai'], 
  ['Solo Leveling','Action'], ['Spy x Family','Action'], ['Soul Eater','Action'], ['Summer Time Rendering','Mystery'], 
  ['Samurai Champloo','Action'], ['Slam Dunk','Sports'], ['Serial Experiments Lain','Psychological'], 
  ['Seven Deadly Sins','Action'], ['Scum\'s Wish','Drama'], ['Tokyo Ghoul','Action'], ['Toradora!','Romance'], 
  ['That Time I Got Reincarnated as a Slime','Isekai'], ['To Your Eternity','Drama'], 
  ['The Rising of the Shield Hero','Isekai'], ['The Eminence in Shadow','Isekai'], ['The Promised Neverland','Thriller'], 
  ['Tokyo Revengers','Action'], ['Tengen Toppa Gurren Lagann','Sci-Fi'], ['Trigun','Action'], 
  ['Tomodachi Game','Psychological'], ['Tower of God','Adventure'], ['Uzaki-chan Wants to Hang Out!','Romance'], 
  ['Uncle from Another World','Isekai'], ['Urusei Yatsura','Romance'], ['Vinland Saga','Historical'], 
  ['Violet Evergarden','Drama'], ['Vampire Knight','Romance'], ['Vividred Operation','Sci-Fi'], 
  ['Wotakoi','Romance'], ['Welcome to Demon School Iruma-kun','Comedy'], ['Wind Breaker','Action'], 
  ['Weathering with You','Drama'], ['Wonder Egg Priority','Psychological'], ['World Trigger','Action'], 
  ['xxxHOLiC','Supernatural'], ['Your Name','Drama'], ['Yu-Gi-Oh!','Adventure'], ['Yu Yu Hakusho','Action'], 
  ['Yona of the Dawn','Adventure'], ['Your Lie in April','Drama'], ['Yamada-kun and the Seven Witches','Romance'], 
  ['Zom 100: Bucket List of the Dead','Action'], ['Zankyou no Terror','Thriller'], ['Zatch Bell!','Adventure'], 
  ['86 Eighty-Six','Sci-Fi'], ['07-Ghost','Fantasy'], ['91 Days','Historical'], ['Afro Samurai','Action'], 
  ['Air Gear','Action'], ['Aldnoah.Zero','Sci-Fi'], ['Angel Beats!','Drama'], ['Arslan Senki','Historical'], 
  ['Baccano!','Historical'], ['Banana Fish','Drama'], ['Black Bullet','Action'], ['Black Lagoon','Action'], 
  ['Blue Exorcist','Supernatural'], ['Cardcaptor Sakura','Fantasy'], ['Charlotte','Supernatural'], 
  ['Cowboy Bebop','Sci-Fi'], ['D.Gray-man','Action'], ['Deadman Wonderland','Action'], 
  ['Death Parade','Psychological'], ['Devilman Crybaby','Horror'], ['Durarara!!','Supernatural'], 
  ['Elfen Lied','Horror'], ['Fate/Zero','Action'], ['Gantz','Sci-Fi'], ['Guilty Crown','Sci-Fi'], 
  ['Harem in the Labyrinth of Another World','Isekai'], ['Kiss Him Not Me','Romance'], 
  ['Komi Can\'t Communicate','Romance'], ['Masamune-kun\'s Revenge','Romance'], ['Platinum End','Psychological'] 
];

const missing = [];
seed.forEach(([title]) => {
  const sanitized = title.replace(/[:\/\\?%*|"<>]/g, '');
  const fileName = sanitized.toLowerCase() + '.jpg';
  if (!files.has(fileName)) {
    missing.push(title);
  }
});

console.log(JSON.stringify(missing, null, 2));
