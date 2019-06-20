/*jshint esversion: 6 */
/*jshint multistr: true */

/* Original script by:
      Skype: RobinKuiper.eu
      Discord: Atheos#1095
      Roll20: https://app.roll20.net/users/1226016/robin
      Reddit: https://www.reddit.com/user/robinkuiper/
      Patreon: https://www.patreon.com/robinkuiper

    Further modifications by Matt DeKok
       Discord: Sillvva#2532
       Roll20: https://app.roll20.net/users/494585/sillvva
       Github: https://github.com/sillvva/Roll20-API-Scripts

    Fantasy Ground adaptation by David Berkompas
       Skype: david.berkompas
       Discord: BoomerET#2354
       Fantasy Grounds: BoomerET
       Github: https://github.com/BoomerET
       Reddit: https://www.reddit.com/user/BoomerET
       Roll20: https://app.roll20.net/users/9982/boomeret
       Paypal.me: https://paypal.me/boomeret
       (All contributions are donated to Hospice, or go here: https://www.hollandhospice.org/giving/donate-now/)
*/

var startXML = "<?xml version=\"1.0\" encoding=\"iso-8859-1\"?>\n";
startXML += "<root version=\"3.3\" release=\"8|CoreRPG:4\">\n";
startXML += "\t<character>\n";
var endXML = "\t</character>\n</root>\n";
var allXML = "";

payFlag = 0;

var pcFilename = "";
var addHP = 0;

charSpellSlots1 = 0;
charSpellSlots2 = 0;
charSpellSlots3 = 0;
charSpellSlots4 = 0;
charSpellSlots5 = 0;
charSpellSlots6 = 0;
charSpellSlots7 = 0;
charSpellSlots8 = 0;
charSpellSlots9 = 0;

holdFeats = [];
holdTraits = [];
holdFeatures = [];
holdProf = [];

var hasAppear = 0;

var fleetFoot = 0;

var source = [
    "Barakas(1387127)",
    "Baradun(1215852)",
    "GuyWithNet(5054951)",
    "Arlo(7494686)",
    "ReallyBasic(7748765)"
];

var totalClasses = 0;

/* * * * * * * * */
const _ABILITIES = {1:'STR',2:'DEX',3:'CON',4:'INT',5:'WIS',6:'CHA'};
const _ABILITY = {'STR': 'strength', 'DEX': 'dexterity', 'CON': 'constitution', 'INT': 'intelligence', 'WIS': 'wisdom', 'CHA': 'charisma'};
const justAbilities = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

const skills = ['acrobatics', 'animal_handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight_of_hand', 'stealth', 'survival'];
const skillsRef = ['dexterity', 'wisdom', 'intelligence', 'strength', 'charisma', 'intelligence', 'wisdom', 'charisma', 'intelligence', 'wisdom', 'intelligence', 'wisdom', 'charisma', 'charisma', 'intelligence', 'dexterity', 'dexterity', 'wisdom'];
const simpleMeleeWeapon = ["club","dagger","greatclub","handaxe","javelin","light_hammer","mace","quartrsfaff","sickle","spear"];
const simpleRangedWeapon = ["crossbow_light","dart","showtbow","sling"];
const martialMeleeWeapon = ["battleaxe","flail","glaive","greataxe","greatsword","halberd","lance","longsword","maul","morningstar","pike","rapier","scimitar","shortsword","trident","war_pick","warhammer","whip"];
const martialRangedWeapon = ["blowgun","crossbow_hand","crossbow_heavy","longbow","net"];
const tieflingRacialTraits = ["darkvision","hellish_resistance"];

var object;

const fullDexArmor = ["padded","leather","studded_leather"];
const max3DexArmor = [];
const max2DexArmor = ["hide","chain_shirt","scale_mail","breastplate","half_plate"];
const noDexArmor = ["ring_mail","chain_mail","splint","plate"];
const disStealth = ["padded","scale_mail","half_plate","ring_mail","chain_mail","splint","plate"];

totalLevels = 0;
totalHP = 0;
isBarbarian = 0;
isBard = 0;
isCleric = 0;
isDruid = 0;
isFighter = 0;
isMonk = 0;
isPaladin = 0;
isRanger = 0;
isRogue = 0;
isSorcerer = 0;
isWarlock = 0;
isWizard = 0;
isBloodHunter = 0;
isDragonborn = 0;
isDwarf = 0;
isElf = 0;
isHalfling = 0;
isHalfOrc = 0;
isHalfElf = 0;
isHuman = 0;
isTiefling = 0;
isGnome = 0;
isAarakocra = 0;
isGenasi = 0;
isGoliath = 0;
isAasimar = 0;
isBugbear = 0;
isFirbolg = 0;
isGoblin = 0;
isHobgoblin = 0;
isKenku = 0;
isKobold = 0;
isLizardfolk = 0;
isOrc = 0;
isTabaxi = 0;
isTriton = 0;
isYyantiPureblood = 0;
isFeralTiefling = 0;
isTortle = 0;
isGith = 0;
isChangling = 0;
isKalashtar = 0;
isShifter = 0;
isWarforged = 0;
isCentaur = 0;
isLoxodon = 0;
isMinotaur = 0;
isSimicHybrid = 0;
isVedalken = 0;
levelBarbarian = 0;
levelBard = 0;
levelCleric = 0;
levelDruid = 0;
levelFighter = 0;
levelMonk = 0;
levelPaladin = 0;
levelRanger = 0;
levelRogue = 0;
levelSorcerer = 0;
levelWarlock = 0;
levelWizard = 0;
levelBloodHunter = 0;

fighterSubclassEldritchKnight = 0;
rogueSubclassArcaneTrickster = 0;

barbRages = 0;
barbPrimalPath = "";
barbTotemSpirit = "";
barbBeastAspect = "";

bardCollege = "";
clericDomain = "";

sorcSorcOrig = "";

wearingArmor = 0;
usingHeavyArmor = 0;
usingMediumArmor = 0;
usingLightArmor = 0;
usingShield = 0;

addBonusArmorAC = 0;
addBonusOtherAC = 0;
addSavingThrows = 0;

addSpeed = 0;

strScore = 0;
strMod = 0;
chaScore = 0;
chaMod = 0;
conScore = 0;
conMod = 0;
intScore = 0;
intMod = 0;
dexScore = 0;
dexMod = 0;
wisScore = 0;
wisMod = 0;

/* * * * * * * * * * */

glCharID = "";

$(function() {
    multiWarn.init();
    dispLinks.init();
    clLinks.init();
    donateFGC.init();
    
    $('#MCwindow').jqxWindow('close');
    $('#Linkwindow').jqxWindow('close');
    $('#CLwindow').jqxWindow('close');
    $('#DONwindow').jqxWindow('close');
    $("#grabChar").jqxButton({ width: '150px', height: '35px', theme: 'darkblue' });
    $('#textHere').jqxTextArea({ theme: 'darkblue', width: 750, height: 150, placeHolder: 'XML will appear here.' });
    $("#getcharID").jqxInput({ placeHolder: "Enter Character ID", height: '35px', width: 200, minLength: 4, theme: 'darkblue'});
    //$("#getcharID").val("7920872");
    $("#dlChar").jqxButton({ width: '120px', height: '35px', theme: 'darkblue' });
    $("#resetChar").jqxButton({ width: '120px', height: '35px', theme: 'darkblue' });
    //$("#popCharID").jqxDropDownList({ source: source, placeHolder: "Select Item", width: 250, height: 35, theme: "darkblue"});
    $("#jqxMenu").jqxMenu({ width: 95, height: '145px', mode: "vertical", theme: 'darkblue'});
    $("#jqxMenu").css('visibility', 'visible');

    $('#extLinks').click(function(e) {
        e.preventDefault();
        $('#Linkwindow').jqxWindow('open');
    });
    $('#goHome').click(function(e) {
        e.preventDefault();
        window.location.reload(false); 
    });
    $('#contactUs').click(function(e) {
        e.preventDefault();
        window.open("https://docs.google.com/forms/d/1OTSE0zUqEcq14Epyp73YVHM9AavhI0uvtH1NeoRoKiA/edit", "_blank");
    });
    $('#showChangelog').click(function(e) {
        e.preventDefault();
        $('#CLwindow').jqxWindow('open');
    });
    $('#showDonations').click(function(e) {
        e.preventDefault();
        $('#DONwindow').jqxWindow('open');
    });

    $('#grabChar').on("click", function() {
        if(!$('#getcharID').val().trim().match(/\d+/)) {
            alert("Um, please enter your Character ID");
        } else if ($('#textHere').val() != "")  {
            var resetMe = confirm("You need to clear previous data, do you want me to do that for you?");
            if (resetMe == 1) {
                window.location.reload(false); 
            }
        } else {
            $.ajax({
                data: { charID:  $('#getcharID').val().trim() },
                url: 'scripts/getChar.php',
                method: 'GET',
                success: function(data) {
                    try {
                        parseCharacter($.parseJSON(data));
                    } catch(e) {
                        alert("Unable to parse character: " + $('#getcharID').val().trim());
                        console.error(e);
                        return;
                    }
                },
                failure: function(msg) {
                    alert("Unable to find character: " + $('#getcharID').val().trim());
                    return;
                }
            });
        }
    });

    $("#dlChar").on("click", function() {
        if ($("#textHere").val() == "") {
            alert("You need to load a character first.");
            return;
        }
        if (pcFilename == "" || pcFilename == null) {
            var ts = Math.round((new Date()).getTime() / 1000);
            pcFilename = ts + ".xml";
        } else {
            pcFilename += ".xml";
        }

        var textFile = new Blob([$("#textHere").val()], {
            type: 'text/plain'
        });
        invokeSaveAsDialog(textFile, pcFilename);
    });

    $("#popCharID").on("change", function(event) {  
        var firstNumber = event.args.item.label.indexOf("(");
        var secondNumber = event.args.item.label.indexOf(")");
        glCharID = event.args.item.label.substring(firstNumber + 1, secondNumber);
        $('#getcharID').val(glCharID);
    });

    $("#resetChar").on("click", function() {
        window.location.reload(false); 
    });
});

function parseCharacter(inputChar) {
    var character = jQuery.extend(true, {}, inputChar);
    if(character.hasOwnProperty("errorCode")) {
        alert("Character " + $("#getcharID").val() + " could not be found.\n \
Either the character doesn't actually exist,\n \
or the character is set to 'Private' instead of 'Public'.\n\nYes, your character MUST be set to PUBLIC.");
    } else {
    allXML = startXML;
    buildXML = "\t\t<!--" + $("#getcharID").val().trim() + "-->\n";
    

    pcFilename = character.name.replace(/\W/g, '');
    buildXML += "\t\t<name type=\"string\">" + character.name + "</name>\n";

    // Alignment
    // 1. Lawful Good
    // 2. Neutral Good
    // 3. Chaotic Good
    // 4. Lawful Neutral
    // 5. Neutral
    // 6. Chaotic Neutral
    // 7. Lawful Evil
    // 8. Neutral Evil
    // 9. Chaotic Evil
    charAlign = "";
    switch(character.alignmentId) {
        case 1:
            charAlign = "Lawful Good";
            break;
        case 2:
            charAlign = "Neutral Good";
            break;
        case 3:
            charAlign = "Chaotic Good";
            break;
        case 4:
            charAlign = "Lawful Neutral";
            break;
        case 5:
            charAlign = "Neutral";
            break;
        case 6:
            charAlign = "Chaotic Neutral";
            break;
        case 7:
            charAlign = "Lawful Evil";
            break;
        case 8:
            charAlign = "Neutral Evil";
            break;
        case 9:
            charAlign = "Chaotic Evil";
            break;
        default:
            charAlign = "None Selected";
    }

    buildXML += "\t\t<alignment type=\"string\">" + charAlign + "</alignment>\n";
    character.race.racialTraits.some(function(fleet_trait, i) {
        if(fleet_trait.definition.name == "Fleet of Foot" || fleet_trait.definition.name == "Swift") {
            addSpeed += 5;
        }
    });

    if(character.traits.personalityTraits != null) {
        buildXML += "\t\t<personalitytraits type=\"string\">" + fixQuote(character.traits.personalityTraits) + "</personalitytraits>\n";
    }
    if(character.traits.ideals != null) {
        buildXML += "\t\t<ideals type=\"string\">" + fixQuote(character.traits.ideals) + "</ideals>\n";
    }
    if(character.traits.bonds != null) {
        buildXML += "\t\t<bonds type=\"string\">" + fixQuote(character.traits.bonds) + "</bonds>\n";
    }
    if(character.traits.flaws != null) {
        buildXML += "\t\t<flaws type=\"string\">" + fixQuote(character.traits.flaws) + "</flaws>\n";
    }

    var background = '';
    if(character.background.definition != null) background = character.background.definition.name;
    if(background == '' && character.background.customBackground.name != null) background = character.background.customBackground.name;
    buildXML += "\t\t<background type=\"string\">" + background + "</background>\n";
    buildXML += "\t\t<backgroundlink type=\"windowreference\">\n";
    buildXML += "\t\t\t<class>reference_background</class>\n";
    if(background.match(/Artisan \/ Guild/)) {
        background = "Guild Artisan";
    } else if(background.match(/House Agent/)) {
        background = "houseagent";
    }
    buildXML += "\t\t\t<recordname>reference.backgrounddata." + background.toLowerCase().replace(/\s/g, "") + "@*</recordname>\n";
    buildXML += "\t\t</backgroundlink>\n";

    buildXML += "\t\t<race type=\"string\">" + character.race.baseName + "</race>\n";
    buildXML += "\t\t<racelink type=\"windowreference\">\n";
    buildXML += "\t\t\t<class>reference_race</class>\n";
    buildXML += "\t\t\t<recordname>reference.racedata." + replaceDash(character.race.baseName.toLowerCase()) + "@*</recordname>\n";
    buildXML += "\t\t</racelink>\n";

    switch (character.race.baseName.toLowerCase()) {
        case 'tiefling':
            isTiefling = 1;
            break;
        case 'dragonborn':
            isDragonborn = 1;
            break;
        case 'dwarf':
            isDwarf = 1;
            break;
        case 'elf':
            isElf = 1;
            break;
        case 'gnome':
            isGnome = 1;
            break;
        case 'half-elf':
            isHalfElf = 1;
            break;
        case 'halfling':
            isHalfling = 1;
            break;
        case 'half-orc':
            isHalfOrc = 1;
            break;
        case 'human':
            isHuman = 1;
            break;
    }
    

    // Attempt at skill list
    idCount = 1;
    hasHalf = 0;
    halfProf = false;
    profValue = 0;
    var halfprof = getObjects(character, 'type', 'half-proficiency');
    for (var x in halfprof) {
        var hfprof = halfprof[x];
        var type = hfprof.subType;
        if(type == 'ability-checks') {
            hasHalf = 1;
        }
    }
    buildXML += "\t\t<skilllist>\n";
    skills.some(function(element) {
        profValue = 0;
        thisIteration = pad(idCount, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<misc type=\"number\">0</misc>\n";
        if(element.match(/^sleight/)) {
            buildXML += "\t\t\t\t<name type=\"string\">Sleight of Hand</name>\n";
        } else if(element.match(/animal/)) {
            buildXML += "\t\t\t\t<name type=\"string\">Animal Handling</name>\n";
        } else {
            buildXML += "\t\t\t\t<name type=\"string\">" + capitalizeFirstLetter(element) + "</name>\n";
        }
        buildXML += "\t\t\t\t<stat type=\"string\">" + skillsRef[idCount - 1] + "</stat>\n";
        
        var proficiencies = getObjects(character, 'type', 'proficiency');
        if(proficiencies != null) {
            proficiencies.some(function(prof) {
                var skill = prof.subType.replace(/-/g, '_');
                if(skill == element) {
                    profValue = 1;
                }
            });
        }
        var expertise = getObjects(character, 'type', 'expertise');
        if(expertise != null) {
            expertise.some(function(exp) {
                var expSkill = exp.subType.replace(/-/g, '_');
                if(expSkill == element) {
                    profValue = 2;
                }
            });
        }

        if(profValue == 0) {
            if(hasHalf == 1) {
                buildXML += "\t\t\t\t<prof type=\"number\">3</prof>\n";
            } else {
                buildXML += "\t\t\t\t<prof type=\"number\">0</prof>\n";
            }
        } else if(profValue == 1) {
            buildXML += "\t\t\t\t<prof type=\"number\">1</prof>\n";
        } else if(profValue == 2) {
            buildXML += "\t\t\t\t<prof type=\"number\">2</prof>\n";
        }


        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        idCount += 1;
    });
    buildXML += "\t\t</skilllist>\n";

    buildXML += "\t\t<classes>\n";
    
    character.classes.some(function(current_class, i) {
        thisClass = current_class.definition.name.toLowerCase();
         if (thisClass == "barbarian") {
            isBarbarian = 1;
            levelBarbarian = current_class.level;
            switch (parseInt(levelBarbarian)) {
                case 1: case 2:
                    barbRages = 2;
                    break;
                case 3: case 4: case 5:
                    barbRages = 3;
                    break;
                case 6: case 7: case 8: case 9: case 10: case 11:
                    barbRages = 4;
                    break;
                case 12: case 13: case 14: case 15: case 16:
                    barbRages = 5;
                    break;
                case 17: case 18: case 19:
                    barbRages = 6;
                    break;
                default:
                    barbRages = 0;
            }
            if(current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
                barbPrimalPath = current_class.subclassDefinition.name;
                current_class.subclassDefinition.classFeatures.some(function(findTotem, j) {
                    if(levelBarbarian >= findTotem.requiredLevel) {
                        if (findTotem.name.match("Totem Spirit")) {
                            animalID = findTotem.id;
                            character.options.class.some(function(guessing, k) {
                                if (animalID == guessing.componentId) {
                                    barbTotemSpirit = guessing.definition.name;
                                }
                            });
                        } else if (findTotem.name.match("Aspect of the Beast")) {
                            animalID = findTotem.id;
                            character.options.class.some(function(guessing, k) {
                                if (animalID == guessing.componentId) {
                                    barbBeastAspect = guessing.definition.name;
                                }
                            });
                        } else if (findTotem.name.match("Totemic Attunement")) {
                            animalID = findTotem.id;
                            character.options.class.some(function(guessing, k) {
                                if (animalID == guessing.componentId) {
                                    barbTotemAttune = guessing.definition.name;
                                }
                            });
                        }
                    }
                });
            }
        } else if (thisClass == "bard") {
            isBard = 1;
            levelBard = current_class.level;
            if(current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
                bardCollege = current_class.subclassDefinition.name;
            }
        } else if (thisClass == "cleric") {
            isCleric = 1;
            levelCleric = current_class.level;
            if(current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
                clericDomain = current_class.subclassDefinition.name;
            }
        } else if (thisClass == "druid") {
            isDruid = 1;
            levelDruid = current_class.level;
        } else if (thisClass == "fighter") {
            isFighter = 1;
            levelFighter = current_class.level;
            if(current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
                if(current_class.subclassDefinition.name == "Eldritch Knight") {
                    fighterSubclassEldritchKnight = 1;
                }
            }
        } else if (thisClass == "monk") {
            isMonk = 1;
            levelMonk = current_class.level;
        } else if (thisClass == "paladin") {
            isPaladin = 1;
            levelPaladin = current_class.level;
        } else if (thisClass == "ranger") {
            isRanger = 1;
            levelRanger = current_class.level;
        } else if (thisClass == "rogue") {
            isRogue = 1;
            levelRogue = current_class.level;
            if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
                if(current_class.subclassDefinition.name == "Arcane Trickster") {
                    rogueSubclassArcaneTrickster = 1;
                }
            }
        } else if (thisClass == "sorcerer") {
            isSorcerer = 1;
            levelSorcerer = current_class.level;
            if (current_class.hasOwnProperty("subclassDefinition") && current_class.subclassDefinition != null) {
                sorcSorcOrig = current_class.subclassDefinition.name;
            }
        } else if (thisClass == "warlock") {
            isWarlock = 1;
            levelWarlock = current_class.level;
        } else if (thisClass == "wizard") {
            isWizard = 1;
            levelWizard = current_class.level;
        } else if (thisClass == "blood hunter") {
            isBloodHunter = 1;
            levelBloodHunter = current_class.level;
        }
        totalClasses += 1;
        totalLevels += current_class.level;
        thisIteration = pad(i + 1, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<hddie type=\"dice\">";
        buildXML += "d" + current_class.definition.hitDice;
        buildXML += "</hddie>\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + current_class.definition.name + "</name>\n";
        if(thisClass === "warlock") {
            buildXML += "\t\t\t\t<casterpactmagic type=\"number\">1</casterpactmagic>\n";
        } else {
            buildXML += "\t\t\t\t<casterpactmagic type=\"number\">0</casterpactmagic>\n";
        }
        if((thisClass == "bard") || (thisClass == "cleric") || (thisClass == "druid")  || (thisClass == "sorcerer") || (thisClass == "warlock")  || (thisClass == "wizard")) {
            buildXML += "\t\t\t\t<casterlevelinvmult type=\"number\">1</casterlevelinvmult>\n";
        } else if ((thisClass == "paladin" || thisClass == "ranger") && current_class.level >= 2) {
            buildXML += "\t\t\t\t<casterlevelinvmult type=\"number\">2</casterlevelinvmult>\n";
        } else if ((thisClass == "rogue" || thisClass == "fighter") && current_class.level >= 3) {
            if(current_class.hasOwnProperty("subclassDefinition")) {
                if(current_class.subclassDefinition.name == "Arcane Trickster" || current_class.subclassDefinition.name == "Eldritch Knight") {
                    buildXML += "\t\t\t\t<casterlevelinvmult type=\"number\">3</casterlevelinvmult>\n";
                }
            }
        }
        buildXML += "\t\t\t\t<level type=\"number\">" + current_class.level + "</level>\n";
        buildXML += "\t\t\t\t<shortcut type=\"windowreference\">\n";
        buildXML += "\t\t\t\t\t<class>reference_class</class>\n";
        buildXML += "\t\t\t\t\t<recordname>reference.classdata." + thisClass.replace(/ /g, "") + "@*</recordname>\n";
        buildXML += "\t\t\t\t</shortcut>\n";
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        
    });
    buildXML += "\t\t</classes>\n";

    if (isBarbarian == 1 && levelBarbarian >= 5 && usingHeavyArmor < 1) {
        addSpeed += 10;
    }

    charWalk = character.race.weightSpeeds.normal.walk + addSpeed;
    buildXML += "\t\t<speed>\n";
    buildXML += "\t\t\t<base type=\"number\">" + parseInt(charWalk) + "</base>\n";
    buildXML += "\t\t\t<total type=\"number\">" + parseInt(charWalk) + "</total>\n";
    buildXML += "\t\t</speed>\n";

    if (totalClasses > 1) {
        $('#MCwindow').jqxWindow('open');
    }

    idCount = 1;
    hasHalf = 0;
    halfProf = false;
    var halfprof2 = getObjects(character, 'type', 'half-proficiency');
    for (var y in halfprof2) {
        var hfprof2 = halfprof2[y];
        var type2 = hfprof2.subType;
        if(type2 == "initiative") {
            halfProf = true;
            buildXML += "\t\t\t<initiative>\n";
            switch (totalLevels) {
                case 1: case 2: case 3: case 4:
                    buildXML += "\t\t\t\t<misc type=\"number\">1</misc>\n";
                    buildXML += "\t\t\t\t<profbonus type=\"number\">2</profbonus>\n";
                    break;
                case 5: case 6: case 7: case 8:
                    buildXML += "\t\t\t\t<misc type=\"number\">1</misc>\n";
                    buildXML += "\t\t\t\t<profbonus type=\"number\">3</profbonus>\n";
                    break;
                case 9: case 10: case 11: case 12:
                    buildXML += "\t\t\t\t<misc type=\"number\">2</misc>\n";
                    buildXML += "\t\t\t\t<profbonus type=\"number\">4</profbonus>\n";
                    break;
                case 13: case 14: case 15: case 16:
                    buildXML += "\t\t\t\t<misc type=\"number\">2</misc>\n";
                    buildXML += "\t\t\t\t<profbonus type=\"number\">5</profbonus>\n";
                    break;
                case 17: case 18: case 19: case 20:
                    buildXML += "\t\t\t\t<misc type=\"number\">3</misc>\n";
                    buildXML += "\t\t\t\t<profbonus type=\"number\">6</profbonus>\n";
                    break;
                default:
                    buildXML += "\t\t\t\t<misc type=\"number\">0</misc>\n";
            }
			
			buildXML += "\t\t\t\t<temporary type=\"number\">0</temporary>\n";
			buildXML += "\t\t\t\t</initiative>\n";
        }
    }

    // baseHitPoints
    character.race.racialTraits.some(function(current_trait, i) {
        if(current_trait.definition.name == "Dwarven Toughness") {
            addHP = totalLevels;
        }
    });
    character.feats.some(function(current_feat, i) {
        if (current_feat.definition.name == "Tough") {
            addHP += totalLevels * 2;
        }
    });
    if(isSorcerer == 1 && sorcSorcOrig.match(/Draconic Bloodline/)) {
        // Draconic Resilience adds 1 to HP
        addHP += levelSorcerer;
    }

    totalHP = parseInt(character.baseHitPoints) + (Math.floor( ( ( getTotalAbilityScore(character, 3) - 10 ) / 2 )) * totalLevels ) + addHP;
    buildXML += "\t\t<hp>\n";
    if(character.deathSaves.failCount != null) {
        buildXML += "\t\t\t<deathsavefail type=\"number\">" + character.deathSaves.failCount + "</deathsavefail>\n";
    } else {
        buildXML += "\t\t\t<deathsavefail type=\"number\">0</deathsavefail>\n";
    }
    if(character.deathSaves.successCount != null) {
        buildXML += "\t\t\t<deathsavesuccess type=\"number\">" + character.deathSaves.successCount + "</deathsavesuccess>\n";
    } else {
        buildXML += "\t\t\t<deathsavesuccess type=\"number\">0</deathsavesuccess>\n";
    }
    buildXML += "\t\t\t<total type=\"number\">" + totalHP + "</total>\n";
    buildXML += "\t\t</hp>\n";

    var languages = getObjects(character, 'type', 'language');
    buildXML += "\t\t<languagelist>\n";
    languages.some(function(current_lang, i) {
        thisIteration = pad(i + 1, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + capitalizeFirstLetter(current_lang.subType) + "</name>\n";
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    });
    buildXML += "\t\t</languagelist>\n";

    character.race.racialTraits.some(function(current_trait, i) {
        if(current_trait.definition.name == "Darkvision") {
            buildXML += "\t\t<senses type=\"string\">Darkvision 60ft.</senses>\n";
        } else if(current_trait.definition.name == "Superior Darkvision") {
            buildXML += "\t\t<senses type=\"string\">Darkvision 120ft.</senses>\n";
        }
    });
 
    buildXML += "\t\t<traitlist>\n";
    character.race.racialTraits.some(function(current_trait, i) {
        switch (current_trait.definition.name) {
            case "Ability Score Increase": case "Age": case "Alignment": case "Size": case "Speed": case "Darkvision":
            case "Dwarven Combat Training": case "Tool Proficiency": case "Languages": case "Dwarven Toughness":
            case "Cantrip": case "Extra Language": case "Dwarven Armor Training": case "Skill Versatility":
                return;
            default:
                break;
        }
        thisIteration = pad(i + 1, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";

        // Drag/drop only lists name, not any snippet, so we've removed it.
        buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(current_trait.definition.name).trim() + "</name>\n";
        buildXML += "\t\t\t\t<source type=\"string\">" + convert_case(replaceDash(character.race.baseName.toLowerCase())) + "</source>\n";
        buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
        buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
        buildXML += "\t\t\t\t\t<p>" + remove_tags_traits(fixQuote(current_trait.definition.description)) + "</p>\n";
        buildXML += "\t\t\t\t</text>\n";
        buildXML += "\t\t\t\t<type type=\"string\">racial</type>\n";
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    });
    
    buildXML += "\t\t</traitlist>\n";

    totalFeatures = 0;
    buildXML += "\t\t<featurelist>\n";
    character.classes.some(function(current_class, i) {
        classLevel = current_class.level;
        current_class.definition.classFeatures.some(function(current_feature, j) {
            
            
            switch (current_feature.name) {
                case "Hit Points": case "Proficiencies": case "Martial Archetype": case "Fighting Style":
                case "Ability Score Improvement": case "Oath Spells": case "Spellcasting":
                case "Circle Spells": case "Bonus Cantrip": case "Bonus Proficiencies": case "Druidic":
                case "Expanded Spell List": case "Otherwordly Patron": case "Expanded Spell List":
                case "Acrobatics": case "Animal Handling": case "Arcana": case "Athletics": case "Deception":
                case "History": case "Intimidation": case "Investigation": case "Medicine": case "Nature":
                case "Perception": case "Performance": case "Persuasion": case "Religion": case "Sleight of Hand":
                case "Stealth": case "Survival": case "Divine Domain": case "Bonus Proficiency":
                    return;
                default:
                    break;
            }
            if(parseInt(current_feature.requiredLevel) <= parseInt(classLevel)) {
                if(holdFeatures.includes(current_feature.name)) {
                    //Skip this one, it's already in the array
                } else {
                    holdFeatures.push(current_feature.name);
                    totalFeatures += 1;
                    thisIteration = pad(totalFeatures, 5);
                    buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                    buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
                    buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(current_feature.name) + "</name>\n";
                    buildXML += "\t\t\t\t<source type=\"string\">" + convert_case(replaceDash(current_class.definition.name.toLowerCase())) + "</source>\n";
                    buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
                    buildXML += "\t\t\t\t\t<p>" + remove_tags_traits(fixQuote(current_feature.description)) + "</p>\n";
                    buildXML += "\t\t\t\t</text>\n";
                    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                }
            }
        });
        if(current_class.hasOwnProperty("subclassDefinition")) {
            if(current_class.subclassDefinition != null) {
                
                if(holdFeatures.includes(current_class.subclassDefinition.name)) {
                    // Skip this one, it's already in the array
                } else {
                    holdFeatures.push(current_class.subclassDefinition.name);
                    totalFeatures += 1;
                    thisIteration = pad(totalFeatures, 5);
                    buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                    buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
                    buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(current_class.subclassDefinition.name) + "</name>\n";
                    buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
                    buildXML += "\t\t\t\t\t<p>" + remove_tags_traits(fixQuote(current_class.subclassDefinition.description)) + "</p>\n";
                    buildXML += "\t\t\t\t</text>\n";
                    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                }
                current_class.subclassDefinition.classFeatures.some(function(charSubClass, i) {
                    switch (charSubClass.name) {
                        case "Hit Points": case "Proficiencies": case "Martial Archetype": case "Fighting Style":
                        case "Ability Score Improvement": case "Oath Spells":
                        case "Circle Spells": case "Bonus Cantrip": case "Bonus Proficiencies": case "Druidic":
                        case "Expanded Spell List": case "Otherwordly Patron": case "Expanded Spell List":
                        case "Acrobatics": case "Animal Handling": case "Arcana": case "Athletics": case "Deception":
                        case "History": case "Intimidation": case "Investigation": case "Medicine": case "Nature":
                        case "Perception": case "Performance": case "Persuasion": case "Religion": case "Sleight of Hand":
                        case "Stealth": case "Survival": case "Divine Domain": case "Bonus Proficiency":
                            return;
                        default:
                            break;
                    }
                    if(charSubClass.requiredLevel <= parseInt(classLevel)) {
                        if(holdFeatures.includes(charSubClass.name)) {
                            // Skip this one, it's already in the array
                        } else {
                            holdFeatures.push(charSubClass.name);
                            totalFeatures += 1;
                            thisIteration = pad(totalFeatures, 5);
                            buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                            buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
                            buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(charSubClass.name) + "</name>\n";
                            buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
                            buildXML += "\t\t\t\t\t" + remove_tags_featureSubclass(fixQuote(charSubClass.description)) + "\n";
                            buildXML += "\t\t\t\t</text>\n";
                            buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                        }
                    }
                });
            }
        }
        
    });
    const charOptions = character.options.class;
    if (charOptions != null) charOptions.some(function(thisOption, i) {
        switch (thisOption.definition.name) {
            case "Hit Points": case "Proficiencies": case "Martial Archetype": case "Fighting Style":
            case "Ability Score Improvement": case "Oath Spells":
            case "Circle Spells": case "Bonus Cantrip": case "Bonus Proficiencies": case "Druidic":
            case "Expanded Spell List": case "Otherwordly Patron": case "Expanded Spell List":
            case "Acrobatics": case "Animal Handling": case "Arcana": case "Athletics": case "Deception":
            case "History": case "Intimidation": case "Investigation": case "Medicine": case "Nature":
            case "Perception": case "Performance": case "Persuasion": case "Religion": case "Sleight of Hand":
            case "Stealth": case "Survival": case "Divine Domain": case "Bonus Proficiency":
                return;
            default:
                break;
        }
        totalFeatures += 1;
        thisIteration = pad(totalFeatures, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(thisOption.definition.name) + "</name>\n";
        buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
        buildXML += "\t\t\t\t\t<p>" + remove_tags_traits(fixQuote(thisOption.definition.description)) + "</p>\n";
        buildXML += "\t\t\t\t</text>\n";
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    });

    if (character.background.definition != null) {
        if (character.background.definition.featureName != null || (character.background.definition.featureName != "")) {
            totalFeatures += 1;
            thisIteration = pad(totalFeatures + 1, 5);
            buildXML += "\t\t\t<id-" + thisIteration + ">\n";
            buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(character.background.definition.featureName).trim() + "</name>\n";
            buildXML += "\t\t\t\t<source type=\"string\">" + convert_case(replaceDash(character.background.definition.name.toLowerCase())) + "</source>\n";
            buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
            buildXML += "\t\t\t\t\t<p>" + remove_tags_traits(fixQuote(character.background.definition.featureDescription)) + "</p>\n";
            buildXML += "\t\t\t\t</text>\n";
            buildXML += "\t\t\t\t<type type=\"string\">background</type>\n";
            buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        }
    }

    // FIXME: What is/was this for?
    character.modifiers.class.some(function(thisMod, i) {
        if (thisMod.isGranted == true) {
            if (thisMod.type != "proficiency" && thisMod.type != "set" && thisMod.type != "language") {
                //console.log(thisMod.friendlySubtypeName);
            }
        }
    });
    
    buildXML += "\t\t</featurelist>\n";

    // Character Inventory
    var weaponList = [];
    var weaponID = [];
    var weaponName = [];
    var weaponProperties = [];
    var weaponDice = [];
    var weaponType = [];
    var weaponBonus = [];
    buildXML += "\t\t<inventorylist>\n";
    const inventory = character.inventory;
    if(inventory != null) inventory.some(function(item, i) {
        thisIteration = pad(i + 1, 5);
        
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<count type=\"number\">" + parseInt(item.quantity) + "</count>\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(item.definition.name) + "</name>\n";
        buildXML += "\t\t\t\t<weight type=\"number\">" + parseInt(item.definition.weight) / parseInt(item.definition.bundleSize) + "</weight>\n";
        buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
        
        if(item.definition.subType == null) {
            buildXML += "\t\t\t\t<type type=\"string\">" + fixQuote(item.definition.filterType) + "</type>\n";
            if(item.definition.filterType == "Armor") {
                if(item.definition.type != null || item.definition.type != "") {
                    buildXML += "\t\t\t\t<subtype type=\"string\">" + fixQuote(item.definition.type) + "</subtype>\n";
                    buildXML += "\t\t\t\t<ac type=\"number\">" + item.definition.armorClass + "</ac>\n";
                }
                if(item.definition.stealthCheck != null) {
                    if(item.definition.stealthCheck == 2) {
                        buildXML += "\t\t\t\t<stealth type=\"string\">Disadvantage</stealth>\n";
                    } else {
                        buildXML += "\t\t\t\t<stealth type=\"string\">-</stealth>\n";
                    }
                }
                if(item.definition.strengthRequirement != null) {
                    buildXML += "\t\t\t\t<strength type=\"string\">Str " + item.definition.strengthRequirement + "</strength>\n";
                } else {
                    buildXML += "\t\t\t\t<strength type=\"string\">-</strength>\n";
                }
            }
        } else {
            buildXML += "\t\t\t\t<type type=\"string\">" + fixQuote(item.definition.subType) + "</type>\n";
        }
        if(item.definition.cost == null) {
            buildXML += "\t\t\t\t<cost type=\"string\"></cost>\n";
        } else {
            buildXML += "\t\t\t\t<cost type=\"string\">" + item.definition.cost + " gp" + "</cost>\n";
        }
        
        if(item.definition.canAttune == true) {
            buildXML += "\t\t\t\t<rarity type=\"string\">" + item.definition.rarity + " (Requires Attunement)</rarity>\n";
        } else {
            buildXML += "\t\t\t\t<rarity type=\"string\">" + item.definition.rarity + "</rarity>\n";
        }
        if(item.equipped == true) {
            buildXML += "\t\t\t\t<carried type=\"number\">2</carried>\n";
            if(item.definition.filterType == "Armor") {
                if(item.definition.type == "Shield") {
                    usingShield = 1;
                } else if (item.definition.type.match("Armor")) {
                    wearingArmor = 1;
                    if (item.definition.type.match("Heavy")) {
                        usingHeavyArmor = 1;
                    } else if (item.definition.type.match("Medium")) {
                        usingMediumArmor = 1;
                    } else if (item.definition.type.match("Light")) {
                        usingLightArmor = 1;
                    }
                }
            }
        } else {
            buildXML += "\t\t\t\t<carried type=\"number\">1</carried>\n";
        }
        
        if(item.definition.hasOwnProperty("damage")) {
            thisDamage = "";
            thisDamType = "";
            if(item.definition.damage != null) {
                thisDamage = item.definition.damage.diceString;
            }
                
            if(item.definition.damageType != null) {
                thisDamType = item.definition.damageType;
            }

            buildXML += "\t\t\t\t<damage type=\"string\">" + thisDamage + " " + thisDamType + "</damage>\n";
            thisProperties = "";
            item.definition.properties.some(function(weapProp, i) {
                if(weapProp.name == "Ammunition" ) {
                    thisProperties += "Ammunition (" + item.definition.range + "/" + item.definition.longRange + "), ";
                } else {
                    thisProperties += weapProp.name + ", ";
                }
            });
            thisProperties = thisProperties.trim().slice(0, -1);
            buildXML += "\t\t\t\t<properties type=\"string\">" + thisProperties + "</properties>\n";
            buildXML += "\t\t\t\t<bonus type=\"number\">0</bonus>\n";

            weaponID.push(i + 1);
            weaponName.push(item.definition.name);
            weaponProperties.push(thisProperties);
            weaponBonus.push(0);
            if(item.definition.damage != null) {
                weaponDice.push("d" + item.definition.damage.diceValue);
            } else {
                weaponDice.push("d0");
            }
            if (item.definition.damageType != null) {
                weaponType.push(item.definition.damageType.toLowerCase());
            } else {
                weaponType.push("");
            }
        }
        
        if (item.definition.hasOwnProperty("weaponBehaviors")) {
            //console.log("Array size: " + item.definition.weaponBehaviors.length);
            if (item.definition.weaponBehaviors.length > 0) {
                thisDamage = "";
                thisDamType = "";
                if(item.definition.weaponBehaviors[0].damage != null) {
                    thisDamage = item.definition.weaponBehaviors[0].damage.diceString;
                }

                if(item.definition.weaponBehaviors[0].damageType != null) {
                    thisDamType = item.definition.weaponBehaviors[0].damageType;
                }

                buildXML += "\t\t\t\t<damage type=\"string\">" + thisDamage + " " + thisDamType + "</damage>\n";
                thisProperties = "";
                item.definition.weaponBehaviors[0].properties.some(function(weapProp, i) {
                    if(weapProp.name == "Ammunition" ) {
                        thisProperties += "Ammunition (" + item.definition.range + "/" + item.definition.longRange + "), ";
                    } else {
                        if (weapProp.hasOwnProperty("notes")) {
                            if (weapProp.notes != "" && weapProp.notes != undefined && weapProp != null) {
                                thisProperties += weapProp.name + "(" + weapProp.notes + "), ";
                            } else {
                                thisProperties += weapProp.name + ", ";
                            }
                        }
                    }
                });
                thisProperties = thisProperties.trim().slice(0, -1);
                buildXML += "\t\t\t\t<properties type=\"string\">" + thisProperties + "</properties>\n";

                weaponID.push(i + 1);
                weaponName.push(item.definition.name);
                weaponProperties.push(thisProperties);
                if(item.definition.weaponBehaviors[0].damage != null) {
                    weaponDice.push("d" + item.definition.weaponBehaviors[0].damage.diceValue);
                } else {
                    weaponDice.push("d0");
                }
                if (item.definition.weaponBehaviors[0].damageType != null) {
                    weaponType.push(item.definition.weaponBehaviors[0].damageType.toLowerCase());
                } else {
                    weaponType.push("");
                }
                item.definition.grantedModifiers.some(function(doMods) {
                    if (doMods.type == "bonus") {
                        weaponBonus.push(doMods.value);
                        buildXML += "\t\t\t\t<bonus type=\"number\">" + doMods.value + "</bonus>\n";
                    }
                });
            } else {
                if (item.definition.hasOwnProperty("grantedModifiers")) {
                    if (item.definition.grantedModifiers.length > 0) {
                        //console.log(item.definition.name);
                        for(l = 0; l <= item.definition.grantedModifiers.length - 1; l++) {
                            if (item.definition.grantedModifiers[l].subType == "armor-class" && item.equipped == true && item.definition.grantedModifiers[l].type == "bonus") {
                                addBonusOtherAC += item.definition.grantedModifiers[l].value;
                            }
                            if (item.definition.grantedModifiers[l].subType == "saving-throws" && item.equipped == true  && item.definition.grantedModifiers[l].type == "bonus") {
                                addSavingThrows += item.definition.grantedModifiers[l].value;
                            }
                        }
                    }
                    
                }
            }
        } else { 
            // Item does not have weaponBehaviors
            if (item.definition.hasOwnProperty("grantedModifiers")) {
            //console.log(item.definition.name);
            //console.log ("gM length: " + item.definition.grantedModifiers[0].length);
                for(m = 0; m <= item.definition.grantedModifiers.length - 1; m++) {
                    if (item.definition.grantedModifiers[m].subType == "armor-class" && item.equipped == true && item.definition.grantedModifiers[m].type == "bonus") {
                        addBonusArmorAC += item.definition.grantedModifiers[m].value;
                    }
                    if (item.definition.grantedModifiers[m].subType == "saving-throws" && item.equipped == true && item.definition.grantedModifiers[m].type == "bonus") {
                        addSavingThrows += item.definition.grantedModifiers[m].value;
                    }
                }
            }
            //    console.log(item.definition.grantedModifiers[l].subType);
            //}
            //item.definition.grantedModifiers.some(function(checksBonus, k) {
            //    console.log(checksBonus.subType);
            //});
            //console.log(item.definition.grantedModifiers[1].subType);
            //if (item.definition.grantedModifiers[0].length > 0) {
            //});
            //$.each( item.definition.grantedModifiers, function( key, value ) {
            //    console.log( key + ": " + value );
            //  });
            //for (var key in item.definition.grantedModifiers[1]) {
            //   if (item.definition.grantedModifiers[0].hasOwnProperty(key)) {
            //        console.log(key + " -> " + item.definition.grantedModifiers[1][key]);
            //    }
            //}
            
        }
        
        buildXML += "\t\t\t\t<description type=\"formattedtext\">\n";
		buildXML += "\t\t\t\t\t<p>" + item.definition.description.replace(/<br>/g, "<br />") + "</p>\n";
        buildXML += "\t\t\t\t</description>\n";
        thisWeaponName = item.definition.name.toLowerCase().replace(/ /g, "_").replace(/\,/g, "");
        if(simpleRangedWeapon.indexOf(thisWeaponName) != -1) {
            buildXML += "\t\t\t\t<subtype type=\"string\">Simple Ranged Weapon</subtype>\n";
        } else if(simpleMeleeWeapon.indexOf(thisWeaponName) != -1) {
            buildXML += "\t\t\t\t<subtype type=\"string\">Simple Melee Weapon</subtype>\n";
        } else if(martialRangedWeapon.indexOf(thisWeaponName) != -1) {
            buildXML += "\t\t\t\t<subtype type=\"string\">Martial Ranged Weapon</subtype>\n";
        }  else if(martialMeleeWeapon.indexOf(thisWeaponName) != -1) {
            buildXML += "\t\t\t\t<subtype type=\"string\">Martial Melee Weapon</subtype>\n";
        } 
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    });
    buildXML += "\t\t</inventorylist>\n";




    buildXML += "\t\t<abilities>\n";
    justAbilities.some(function(thisAbility, i) {
        abilScore = parseInt(getTotalAbilityScore(character, i + 1));
        modScore = parseInt(abilScore / 2) - 5;

        if(thisAbility == "strength") {
            strScore = abilScore;
            strMod = modScore;
        } else if(thisAbility == "dexterity") {
            dexScore = abilScore;
            dexMod = modScore;
        } else if(thisAbility == "constitution") {
            conScore = abilScore;
            conMod = modScore;
        } else if(thisAbility == "intelligence") {
            intScore = abilScore;
            intMod = modScore;
        } else if(thisAbility == "wisdom") {
            wisScore = abilScore;
            wisMod = modScore;
        } else if(thisAbility == "charisma") {
            chaScore = abilScore;
            chaMod = modScore;
        }
        buildXML += "\t\t\t<" + thisAbility + ">\n";
        buildXML += "\t\t\t\t<bonus type=\"number\">" + modScore + "</bonus>\n";

        buildXML += "\t\t\t\t<savemodifier type=\"number\">" + addSavingThrows + "</savemodifier>\n";
        character.modifiers.class.some(function(thisMod, i) {
            if(thisMod.subType == thisAbility + "-saving-throws") {
                buildXML += "\t\t\t\t<saveprof type=\"number\">1</saveprof>\n";
            }
        });
        buildXML += "\t\t\t\t<score type=\"number\">" + abilScore + "</score>\n";
        buildXML += "\t\t\t</" + thisAbility + ">\n";
    });
    buildXML += "\t\t</abilities>\n";









    buildXML += "\t\t<weaponlist>\n";
    var weaponCount = 0;
    for(x = 0; x < weaponID.length; x++) {
        weaponCount += 1;
        thisIteration = pad(x + 1, 5);
        inventNum = pad(parseInt(weaponID[x]), 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<shortcut type=\"windowreference\">\n";
		buildXML += "\t\t\t\t\t<class>item</class>\n";
		buildXML += "\t\t\t\t\t<recordname>....inventorylist.id-" + inventNum + "</recordname>\n";
		buildXML += "\t\t\t\t</shortcut>\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + weaponName[x] + "</name>\n";
        buildXML += "\t\t\t\t<properties type=\"string\">" + weaponProperties[x] + "</properties>\n";
        buildXML += "\t\t\t\t<damagelist>\n";
        buildXML += "\t\t\t\t\t<id-00001>\n";
        buildXML += "\t\t\t\t\t\t<bonus type=\"number\">" +  weaponBonus[x] + "</bonus>\n";
		buildXML += "\t\t\t\t\t\t<dice type=\"dice\">" + weaponDice[x] + "</dice>\n";
		buildXML += "\t\t\t\t\t\t<stat type=\"string\">base</stat>\n";
		buildXML += "\t\t\t\t\t\t<type type=\"string\">" + weaponType[x] + "</type>\n";
        buildXML += "\t\t\t\t\t</id-00001>\n";

        buildXML += "\t\t\t\t</damagelist>\n";
        buildXML += "\t\t\t\t\t\t<attackbonus type=\"number\">" + weaponBonus[x] + "</attackbonus>\n";
        // 0: Melee, 1: Ranged, 2: Thrown
        if(weaponProperties[x].match(/Thrown/)) {
            buildXML += "\t\t\t\t<type type=\"number\">2</type>\n";
        } else if(weaponProperties[x].match(/Range/)) {
            buildXML += "\t\t\t\t<type type=\"number\">1</type>\n";
        } else {
            buildXML += "\t\t\t\t<type type=\"number\">0</type>\n";
        }
        
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    }
    if (isMonk == 1) {
        weaponCount += 1;
        thisIteration = pad(weaponCount + 1, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += addMonkUnarmedStrike;
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    }

    buildXML += "\t\t</weaponlist>\n";

    buildXML += "\t\t<featlist>\n";
    const charFeats = character.feats;
    if (charFeats != null) charFeats.some(function(thisFeat, i) {
        thisIteration = pad(i + 1, 5);
        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
        buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
        buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(thisFeat.definition.name) + "</name>\n";
        buildXML += "\t\t\t\t<text type=\"formattedtext\">\n";
        buildXML += "\t\t\t\t\t<p>" + remove_tags_traits(fixQuote(thisFeat.definition.description)) + "</p>\n";
        buildXML += "\t\t\t\t</text>\n";
        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
    });
    buildXML += "\t\t</featlist>\n";

    totalProfs = 0;
    buildXML += "\t\t<proficiencylist>\n";
    var proficiencies = getObjects(character, 'type', 'proficiency');
    if(proficiencies != null) proficiencies.some(function(prof, i) {
        if (typeof prof.friendlySubtypeName == 'undefined') {
        //    console.log("Has friendly");
        //} else {
        //    console.log("Yup, found something here");
        //}
        //if(holdProf.includes(prof.friendlySubtypeName) || (prof.friendlySubtypeName).match(/Saving Throws/)) {
            // FIXME: What is this?
            //console.log("We got here");
        } else {
            if ((prof.friendlySubtypeName).match(/Saving Throws/) || holdProf.includes(prof.friendlySubtypeName)) {
                // Skip Saving Throws in proficiencies
            } else {
                switch (prof.friendlySubtypeName) {
                    case "Athletics": case "Acrobatics": case "Sleight of Hand": case "Stealth": case "Arcana": case "History": case "Investigation": case "Nature": case "Religion": case "Animal Handling": case "Insight": case "Medicine": case "Perception": case "Survival": case "Deception": case "Intimidation": case "Performance": case "Persuasion":
                        return;
                    default:
                        holdProf.push(prof.friendlySubtypeName);
                        thisIteration = pad(i + 1, 5);
                        totalProfs += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(prof.friendlySubtypeName) + "</name>\n";
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                }
            }
        }
    });

    buildXML += "\t\t</proficiencylist>\n";

    buildXML += "\t\t<exp type=\"number\">" + character.currentXp + "</exp>\n";
    if(character.age != null) buildXML += "\t\t<age type=\"string\">" + character.age + "</age>\n";
    buildXML += "\t\t<height type=\"string\">" + fixQuote(character.height) + "</height>\n";
    if(character.weight != null) buildXML += "\t\t<weight type=\"string\">" + character.weight + "</weight>\n";
    buildXML += "\t\t<gender type=\"string\">" + fixQuote(character.gender) + "</gender>\n";
    buildXML += "\t\t<size type=\"string\">" + character.race.size + "</size>\n";
    buildXML += "\t\t<deity type=\"string\">" + fixQuote(character.faith) + "</deity>\n";

    if (character.eyes != null) {
        hasAppear += 1;
    }
    if (character.hair != null) {
        hasAppear += 2;
    }
    if (character.skin != null) {
        hasAppear += 4;
    }

    if (hasAppear == 1) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "</appearance>\n";
    } else if (hasAppear == 2) {
        buildXML += "\t\t<appearance type=\"string\">Hair: " + fixQuote(character.hair) + "</appearance>\n";
    } else if (hasAppear == 3) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "\\nHair: " + fixQuote(character.hair) + "</appearance>\n";
    } else if (hasAppear == 4) {
        buildXML += "\t\t<appearance type=\"string\">Skin: " + fixQuote(character.skin) + "</appearance>\n";
    } else if (hasAppear == 5) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "\\nSkin: " + fixQuote(character.skin) + "</appearance>\n";
    } else if (hasAppear == 6) {
        buildXML += "\t\t<appearance type=\"string\">Hair: " + fixQuote(character.hair) + "\\nSkin: " + fixQuote(character.skin) + "</appearance>\n";
    } else if (hasAppear == 7) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "\\nHair: " + fixQuote(character.hair) + "\\nSkin: " + fixQuote(character.skin) + "</appearance>\n";
    }

    pactSlots = 0;
    pactLevel = 0;
    character.classes.some(function(current_class, i) {
        charClass = current_class.definition.name.toLowerCase();
        if(charClass === "warlock") {
            pactSlots = getPactMagicSlots(current_class.level);
            pactLevel = current_class.level;
        } else {
            if (current_class.hasOwnProperty("subclassDefinition")) {
                if(current_class.subclassDefinition != null) {
                    getSpellSlots(charClass, current_class.level, current_class.subclassDefinition.name);
                } else {
                    getSpellSlots(charClass, current_class.level, null);
                }
            } else {
                getSpellSlots(charClass, current_class.level, null);
            }
        }
    });

    buildXML += "\t\t<powermeta>\n";
    buildXML += "\t\t\t<pactmagicslots1>\n";
    if(pactLevel <= 2) {
        buildXML += "\t\t\t\t<max type=\"number\">" + parseInt(pactSlots) + "</max>\n";
    } else {
        buildXML += "\t\t\t\t<max type=\"number\">0</max>\n";
    }
    buildXML += "\t\t\t</pactmagicslots1>\n";
    buildXML += "\t\t\t<pactmagicslots2>\n";
    if((pactLevel <= 4) && (pactLevel > 2)) {
        buildXML += "\t\t\t\t<max type=\"number\">" + parseInt(pactSlots) + "</max>\n";
    } else {
        buildXML += "\t\t\t\t<max type=\"number\">0</max>\n";
    }
    buildXML += "\t\t\t</pactmagicslots2>\n";
    buildXML += "\t\t\t<pactmagicslots3>\n";
    if((pactLevel <= 6) && (pactLevel > 4)) {
        buildXML += "\t\t\t\t<max type=\"number\">" + parseInt(pactSlots) + "</max>\n";
    } else {
        buildXML += "\t\t\t\t<max type=\"number\">0</max>\n";
    }
    buildXML += "\t\t\t</pactmagicslots3>\n";
    buildXML += "\t\t\t<pactmagicslots4>\n";
    if((pactLevel <= 8) && (pactLevel > 6)) {
        buildXML += "\t\t\t\t<max type=\"number\">" + parseInt(pactSlots) + "</max>\n";
    } else {
        buildXML += "\t\t\t\t<max type=\"number\">0</max>\n";
    }
    buildXML += "\t\t\t</pactmagicslots4>\n";
    buildXML += "\t\t\t<pactmagicslots5>\n";
    if((pactLevel <= 20) && (pactLevel > 8)) {
        buildXML += "\t\t\t\t<max type=\"number\">" + parseInt(pactSlots) + "</max>\n";
    } else {
        buildXML += "\t\t\t\t<max type=\"number\">0</max>\n";
    }
    buildXML += "\t\t\t</pactmagicslots5>\n";
    buildXML += "\t\t\t<pactmagicslots6>\n";
    buildXML += "\t\t\t\t<max type=\"number\">0</max>\n";
    buildXML += "\t\t\t</pactmagicslots6>\n";
    buildXML += "\t\t\t<pactmagicslots7>\n";
    buildXML += "\t\t\t\t<max type=\"number\">0</max>\n";
    buildXML += "\t\t\t</pactmagicslots7>\n";
    buildXML += "\t\t\t<pactmagicslots8>\n";
    buildXML += "\t\t\t\t<max type=\"number\">0</max>\n";
    buildXML += "\t\t\t</pactmagicslots8>\n";
    buildXML += "\t\t\t<pactmagicslots9>\n";
    buildXML += "\t\t\t\t<max type=\"number\">0</max>\n";
    buildXML += "\t\t\t</pactmagicslots9>\n";

    buildXML += "\t\t\t<spellslots1>\n";
    buildXML += "\t\t\t\t<max type=\"number\">" + charSpellSlots1 + "</max>\n";
    buildXML += "\t\t\t</spellslots1>\n";
    buildXML += "\t\t\t<spellslots2>\n";
    buildXML += "\t\t\t\t<max type=\"number\">" + charSpellSlots2 + "</max>\n";
    buildXML += "\t\t\t</spellslots2>\n";
    buildXML += "\t\t\t<spellslots3>\n";
    buildXML += "\t\t\t\t<max type=\"number\">" + charSpellSlots3 + "</max>\n";
    buildXML += "\t\t\t</spellslots3>\n";
    buildXML += "\t\t\t<spellslots4>\n";
    buildXML += "\t\t\t\t<max type=\"number\">" + charSpellSlots4 + "</max>\n";
    buildXML += "\t\t\t</spellslots4>\n";
    buildXML += "\t\t\t<spellslots5>\n";
    buildXML += "\t\t\t\t<max type=\"number\">" + charSpellSlots5 + "</max>\n";
    buildXML += "\t\t\t</spellslots5>\n";
    buildXML += "\t\t\t<spellslots6>\n";
    buildXML += "\t\t\t\t<max type=\"number\">" + charSpellSlots6 + "</max>\n";
    buildXML += "\t\t\t</spellslots6>\n";
    buildXML += "\t\t\t<spellslots7>\n";
    buildXML += "\t\t\t\t<max type=\"number\">" + charSpellSlots7 + "</max>\n";
    buildXML += "\t\t\t</spellslots7>\n";
    buildXML += "\t\t\t<spellslots8>\n";
    buildXML += "\t\t\t\t<max type=\"number\">" + charSpellSlots8 + "</max>\n";
    buildXML += "\t\t\t</spellslots8>\n";
    buildXML += "\t\t\t<spellslots9>\n";
    buildXML += "\t\t\t\t<max type=\"number\">" + charSpellSlots9 + "</max>\n";
    buildXML += "\t\t\t</spellslots9>\n";
    buildXML += "\t\t</powermeta>\n";

    buildXML += "\t\t<coins>\n";
    buildXML += "\t\t\t<slot1>\n";
    buildXML += "\t\t\t\t<amount type=\"number\">" + character.currencies.pp + "</amount>\n";
    buildXML += "\t\t\t\t<name type=\"string\">PP</name>\n";
    buildXML += "\t\t\t</slot1>\n";
    buildXML += "\t\t\t<slot2>\n";
    buildXML += "\t\t\t\t<amount type=\"number\">" + character.currencies.gp + "</amount>\n";
    buildXML += "\t\t\t\t<name type=\"string\">GP</name>\n";
    buildXML += "\t\t\t</slot2>\n";
    buildXML += "\t\t\t<slot3>\n";
    buildXML += "\t\t\t\t<amount type=\"number\">" + character.currencies.ep + "</amount>\n";
    buildXML += "\t\t\t\t<name type=\"string\">EP</name>\n";
    buildXML += "\t\t\t</slot3>\n";
    buildXML += "\t\t\t<slot4>\n";
    buildXML += "\t\t\t\t<amount type=\"number\">" + character.currencies.sp + "</amount>\n";
    buildXML += "\t\t\t\t<name type=\"string\">SP</name>\n";
    buildXML += "\t\t\t</slot4>\n";
    buildXML += "\t\t\t<slot5>\n";
    buildXML += "\t\t\t\t<amount type=\"number\">" + character.currencies.cp + "</amount>\n";
    buildXML += "\t\t\t\t<name type=\"string\">CP</name>\n";
    buildXML += "\t\t\t</slot5>\n";
    buildXML += "\t\t\t<slot6>\n";
    buildXML += "\t\t\t\t<amount type=\"number\">0</amount>\n";
    buildXML += "\t\t\t</slot6>\n";
    buildXML += "\t\t</coins>\n";

    // Power Groups
    buildXML += "\t\t<powergroup>\n";
	//buildXML += "\t\t\t<id-00001>\n";
	//buildXML += "\t\t\t\t<name type=\"string\">Resistances</name>\n";
	//buildXML += "\t\t\t</id-00001>\n";
    //buildXML += "\t\t\t<id-00002>\n";
    //buildXML += "\t\t\t\t<name type=\"string\">Immunities</name>\n";
    //buildXML += "\t\t\t</id-00002>\n";
    
    if(isDruid == 1 || isCleric == 1 || isBard == 1) {
        buildXML += "\t\t\t<id-00001>\n";
        buildXML += "\t\t\t\t<name type=\"string\">Spells</name>\n";
        buildXML += "\t\t\t\t<stat type=\"string\">wisdom</stat>\n";
        buildXML += "\t\t\t\t<castertype type=\"string\">memorization</castertype>\n";
        buildXML += "\t\t\t</id-00001>\n";
    } else if(isSorcerer == 1 || isWarlock == 1) {
        buildXML += "\t\t\t<id-00001>\n";
        buildXML += "\t\t\t\t<name type=\"string\">Spells</name>\n";
        buildXML += "\t\t\t\t<stat type=\"string\">charisma</stat>\n";
        buildXML += "\t\t\t\t<castertype type=\"string\">memorization</castertype>\n";
        buildXML += "\t\t\t</id-00001>\n";
    } else if(isWizard == 1) {
        buildXML += "\t\t\t<id-00001>\n";
        buildXML += "\t\t\t\t<name type=\"string\">Spells</name>\n";
        buildXML += "\t\t\t\t<stat type=\"string\">intelligence</stat>\n";
        buildXML += "\t\t\t\t<castertype type=\"string\">memorization</castertype>\n";
        buildXML += "\t\t\t</id-00001>\n";
    } else if (isRanger == 1 && levelRanger >= 2) {
        buildXML += "\t\t\t<id-00001>\n";
        buildXML += "\t\t\t\t<name type=\"string\">Spells</name>\n";
        buildXML += "\t\t\t\t<stat type=\"string\">wisdom</stat>\n";
        buildXML += "\t\t\t\t<castertype type=\"string\">memorization</castertype>\n";
        buildXML += "\t\t\t</id-00001>\n";
    } else if (isPaladin == 1 && levelPaladin >= 2) {
        buildXML += "\t\t\t<id-00001>\n";
        buildXML += "\t\t\t\t<name type=\"string\">Spells</name>\n";
        buildXML += "\t\t\t\t<stat type=\"string\">charisma</stat>\n";
        buildXML += "\t\t\t\t<castertype type=\"string\">memorization</castertype>\n";
        buildXML += "\t\t\t</id-00001>\n";
    } else if (isRogue == 1 && rogueSubclassArcaneTrickster == 1) {
        buildXML += "\t\t\t<id-00001>\n";
        buildXML += "\t\t\t\t<name type=\"string\">Spells</name>\n";
        buildXML += "\t\t\t\t<stat type=\"string\">intelligence</stat>\n";
        buildXML += "\t\t\t\t<castertype type=\"string\">memorization</castertype>\n";
        buildXML += "\t\t\t</id-00001>\n";
    } else if (isFighter == 1 && fighterSubclassEldritchKnight == 1) {
        buildXML += "\t\t\t<id-00001>\n";
        buildXML += "\t\t\t\t<name type=\"string\">Spells</name>\n";
        buildXML += "\t\t\t\t<stat type=\"string\">intelligence</stat>\n";
        buildXML += "\t\t\t\t<castertype type=\"string\">memorization</castertype>\n";
        buildXML += "\t\t\t</id-00001>\n";
    }
    
    buildXML += "\t\t</powergroup>\n";

    // Spells sourceId:
    //    1: Players Handbook?
    //    2: Players Handbook?
    //    3: Dungeon Masters Guide
    //    4: Xanathar's Guide to Everything

    // Activation (casting time)
    // activation.activationTime
    //    null
    //    1
    // activation.activationType
    //    null
    //    1: action
    
    //    3: bonus action
    //    4: reaction
    //    5: second
    //    6: minute
    //    7: hour
    //    8: day
    totalSpells = 0;
    var spellList = [];
    buildXML += "\t\t<powers>\n";
    character.spells.race.some(function(eachSpell, i) {
        if(!spellList.includes(eachSpell.definition.name)) {
            spellList.push(eachSpell.definition.name);
            totalSpells += 1;
            thisIteration = pad(totalSpells, 5);
            buildXML += "\t\t\t<id-" + thisIteration + ">\n";
            castingTime = "";
            if(eachSpell.definition.activation.activationTime == null) {
                castingTime = "";
            } else {
                castingTime = eachSpell.definition.activation.activationTime;
            }
            if(eachSpell.definition.activation.activationType == null) {
                castingTime += "";
            } else if(eachSpell.definition.activation.activationType == 1) {
                castingTime += " action";
            } else if(eachSpell.definition.activation.activationType == 3) {
                castingTime += " bonus action";
            } else if(eachSpell.definition.activation.activationType == 4) {
                castingTime += " reaction"; 
            } else if(eachSpell.definition.activation.activationType == 5) {
                    castingTime += " second";
            } else if(eachSpell.definition.activation.activationType == 6) {
                castingTime += " minute";
            } else if(eachSpell.definition.activation.activationType == 7) {
                castingTime += " hour";
            } else if(eachSpell.definition.activation.activationType == 8) {
                castingTime += " day";
            }
            buildXML += "\t\t\t\t<castingtime type=\"string\">" + castingTime + "</castingtime>\n";

            // Components: 1: Verbal; 2: Somatic; 3: Material
            componentList = "";
            if(eachSpell.definition.components.indexOf(1) != -1) {
                componentList += "V, ";
            }
            if(eachSpell.definition.components.indexOf(2) != -1) {
                componentList += "S, ";
            }
            if(eachSpell.definition.components.indexOf(3) != -1) {
                componentList += "M (" + eachSpell.definition.componentsDescription + "), ";
            }
            componentList = componentList.trim().slice(0, -1);
            buildXML += "\t\t\t\t<components type=\"string\">" + componentList + "</components>\n";
		    buildXML += "\t\t\t\t<description type=\"formattedtext\">\n";
            buildXML += "\t\t\t\t\t<p>" + remove_tags_traits(fixQuote(eachSpell.definition.description)) + "</p>\n";
            buildXML += "\t\t\t\t</description>\n";
            if(eachSpell.definition.duration.durationType == "Time") {
		        buildXML += "\t\t\t\t<duration type=\"string\">" + eachSpell.definition.duration.durationInterval + " " + eachSpell.definition.duration.durationUnit + "</duration>\n";
            } else if(eachSpell.definition.duration.durationType == "Instantaneous") {
                buildXML += "\t\t\t\t<duration type=\"string\">Instantaneous</duration>\n";
            }
            buildXML += "\t\t\t\t<group type=\"string\">Spells</group>\n";
		    buildXML += "\t\t\t\t<level type=\"number\">" + eachSpell.definition.level + "</level>\n";
		    buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
		    buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(eachSpell.definition.name) + "</name>\n";
            buildXML += "\t\t\t\t<prepared type=\"number\">0</prepared>\n";
            if (eachSpell.definition.ritual == true) {
                buildXML += "\t\t\t\t<ritual type=\"number\">1</ritual>\n";
            } else {
                buildXML += "\t\t\t\t<ritual type=\"number\">0</ritual>\n";
            }
            if(eachSpell.definition.range.origin == "Ranged") {
                buildXML += "\t\t\t\t<range type=\"string\">" + eachSpell.definition.range.rangeValue + "</range>\n";
            } else if(eachSpell.definition.range.origin == "Touch") {
                buildXML += "\t\t\t\t<range type=\"string\">Touch</range>\n";
            } else if(eachSpell.definition.range.origin == "Self") {
                buildXML += "\t\t\t\t<range type=\"string\">Self</range>\n";
            }
            buildXML += "\t\t\t\t<school type=\"string\">" + fixQuote(eachSpell.definition.school) + "</school>\n";
            if (payFlag == 1) {
                buildXML += "\t\t\t\t<parse type=\"number\">1</parse>\n";
            }
		    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        }
    });
    character.spells.class.some(function(eachSpell, i) {
        if(!spellList.includes(eachSpell.definition.name)) {
            spellList.push(eachSpell.definition.name);
            totalSpells += 1;
            thisIteration = pad(totalSpells, 5);
            buildXML += "\t\t\t<id-" + thisIteration + ">\n";

            castingTime = "";
            if(eachSpell.definition.activation.activationTime == null) {
                castingTime = "";
            } else {
                castingTime = eachSpell.definition.activation.activationTime;
            }
            if(eachSpell.definition.activation.activationType == null) {
                castingTime += "";
            } else if(eachSpell.definition.activation.activationType == 1) {
                castingTime += " action";
            } else if(eachSpell.definition.activation.activationType == 3) {
                castingTime += " bonus action";
            } else if(eachSpell.definition.activation.activationType == 4) {
                castingTime += " reaction"; 
            } else if(eachSpell.definition.activation.activationType == 5) {
                    castingTime += " second";
            } else if(eachSpell.definition.activation.activationType == 6) {
                castingTime += " minute";
            } else if(eachSpell.definition.activation.activationType == 7) {
                castingTime += " hour";
            } else if(eachSpell.definition.activation.activationType == 8) {
                castingTime += " day";
            }
            buildXML += "\t\t\t\t<castingtime type=\"string\">" + castingTime + "</castingtime>\n";
            // Components: 1: Verbal; 2: Somatic; 3: Material
            componentList = "";
            if(eachSpell.definition.components.indexOf(1) != -1) {
                componentList += "V, ";
            }
            if(eachSpell.definition.components.indexOf(2) != -1) {
                componentList += "S, ";
            }
            if(eachSpell.definition.components.indexOf(3) != -1) {
                componentList += "M (" + eachSpell.definition.componentsDescription + "), ";
            }
            componentList = componentList.trim().slice(0, -1);
            buildXML += "\t\t\t\t<components type=\"string\">" + componentList + "</components>\n";
		    buildXML += "\t\t\t\t<description type=\"formattedtext\">\n";
            buildXML += "\t\t\t\t\t<p>" + remove_tags_traits(fixQuote(eachSpell.definition.description)) + "</p>\n";
            buildXML += "\t\t\t\t</description>\n";
            if(eachSpell.definition.duration.durationType == "Time") {
		        buildXML += "\t\t\t\t<duration type=\"string\">" + eachSpell.definition.duration.durationInterval + " " + eachSpell.definition.duration.durationUnit + "</duration>\n";
            } else if(eachSpell.definition.duration.durationType == "Instantaneous") {
                buildXML += "\t\t\t\t<duration type=\"string\">Instantaneous</duration>\n";
            }
            buildXML += "\t\t\t\t<group type=\"string\">Spells</group>\n";
		    buildXML += "\t\t\t\t<level type=\"number\">" + eachSpell.definition.level + "</level>\n";
		    buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
		    buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(eachSpell.definition.name) + "</name>\n";
            buildXML += "\t\t\t\t<prepared type=\"number\">0</prepared>\n";
            if (eachSpell.definition.ritual == true) {
                buildXML += "\t\t\t\t<ritual type=\"number\">1</ritual>\n";
            } else {
                buildXML += "\t\t\t\t<ritual type=\"number\">0</ritual>\n";
            }
            if(eachSpell.definition.range.origin == "Ranged") {
                buildXML += "\t\t\t\t<range type=\"string\">" + eachSpell.definition.range.rangeValue + "</range>\n";
            } else if(eachSpell.definition.range.origin == "Touch") {
                buildXML += "\t\t\t\t<range type=\"string\">Touch</range>\n";
            } else if(eachSpell.definition.range.origin == "Self") {
                buildXML += "\t\t\t\t<range type=\"string\">Self</range>\n";
            }
            buildXML += "\t\t\t\t<school type=\"string\">" + fixQuote(eachSpell.definition.school) + "</school>\n";
            if (payFlag == 1) {
                buildXML += "\t\t\t\t<parse type=\"number\">1</parse>\n";
            }
		    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        }
    });
    character.classes.some(function(current_class, i) {
        for(var j in character.classSpells) {
            var spells = character.classSpells[j];
            if(character.classSpells[j].characterClassId == current_class.id) {
                character.classSpells[j].spells.some(function(spell) {
                    if(!spellList.includes(spell.definition.name)) {
                        if(spell.prepared == true || spell.alwaysPrepared == true || spell.definition.level == 0 || spell.definition.ritual == true || isSorcerer == 1 || isRanger == 1 || isBard == 1 || rogueSubclassArcaneTrickster == 1 ||fighterSubclassEldritchKnight == 1) {
                            spellList.push(spell.definition.name);
                            totalSpells += 1;
                            thisIteration = pad(totalSpells, 5);
                            buildXML += "\t\t\t<id-" + thisIteration + ">\n";

                            castingTime = "";
                            if(spell.definition.activation.activationTime == null) {
                                castingTime = "";
                            } else {
                                castingTime = spell.definition.activation.activationTime;
                            }
                            if(spell.definition.activation.activationType == null) {
                                castingTime += "";
                            } else if(spell.definition.activation.activationType == 1) {
                                castingTime += " action";
                            } else if(spell.definition.activation.activationType == 3) {
                                castingTime += " bonus action";
                            } else if(spell.definition.activation.activationType == 4) {
                                castingTime += " reaction"; 
                            } else if(spell.definition.activation.activationType == 5) {
                                    castingTime += " second";
                            } else if(spell.definition.activation.activationType == 6) {
                                castingTime += " minute";
                            } else if(spell.definition.activation.activationType == 7) {
                                castingTime += " hour";
                            } else if(spell.definition.activation.activationType == 8) {
                                castingTime += " day";
                            }
                            buildXML += "\t\t\t\t<castingtime type=\"string\">" + castingTime + "</castingtime>\n";
                            // Components: 1: Verbal; 2: Somatic; 3: Material
                            componentList = "";
                            if(spell.definition.components.indexOf(1) != -1) {
                                componentList += "V, ";
                            }
                            if(spell.definition.components.indexOf(2) != -1) {
                                componentList += "S, ";
                            }
                            if(spell.definition.components.indexOf(3) != -1) {
                                componentList += "M (" + spell.definition.componentsDescription + ")* ";
                            }
                            componentList = componentList.trim().slice(0, -1);

                            buildXML += "\t\t\t\t<components type=\"string\">" + componentList + "</components>\n";
		                    buildXML += "\t\t\t\t<description type=\"formattedtext\">\n";
                            buildXML += "\t\t\t\t\t<p>" + remove_tags_traits(fixQuote(spell.definition.description)) + "</p>\n";
                            buildXML += "\t\t\t\t</description>\n";
                            if(spell.definition.duration.durationType == "Time") {
		                        buildXML += "\t\t\t\t<duration type=\"string\">" + spell.definition.duration.durationInterval + " " + spell.definition.duration.durationUnit + "</duration>\n";
                            } else if(spell.definition.duration.durationType == "Instantaneous") {
                                buildXML += "\t\t\t\t<duration type=\"string\">Instantaneous</duration>\n";
                            }
                            buildXML += "\t\t\t\t<group type=\"string\">Spells</group>\n";
		                    buildXML += "\t\t\t\t<level type=\"number\">" + spell.definition.level + "</level>\n";
                            buildXML += "\t\t\t\t<locked type=\"number\">1</locked>\n";
		                    buildXML += "\t\t\t\t<name type=\"string\">" + fixQuote(spell.definition.name) + "</name>\n";
                            buildXML += "\t\t\t\t<prepared type=\"number\">0</prepared>\n";
                            if (spell.definition.ritual == true) {
                                buildXML += "\t\t\t\t<ritual type=\"number\">1</ritual>\n";
                            } else {
                                buildXML += "\t\t\t\t<ritual type=\"number\">0</ritual>\n";
                            }
                            if(spell.definition.range.origin == "Ranged") {
                                buildXML += "\t\t\t\t<range type=\"string\">" + spell.definition.range.rangeValue + "</range>\n";
                            } else if(spell.definition.range.origin == "Touch") {
                                buildXML += "\t\t\t\t<range type=\"string\">Touch</range>\n";
                            } else if(spell.definition.range.origin == "Self") {
                                buildXML += "\t\t\t\t<range type=\"string\">Self</range>\n";
                            }
                            buildXML += "\t\t\t\t<school type=\"string\">" + fixQuote(spell.definition.school) + "</school>\n";
                            if (payFlag == 1) {
                                buildXML += "\t\t\t\t<parse type=\"number\">1</parse>\n";
                            }
                            buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                        }   
                    }
                });
            }
        }
    });

    // I think this sould be moved. We have class things for this, maybe have racial as well.

    // Okay, let's get ready for the paid version
    if (payFlag == 1) {
        if (isTiefling) {
            thisIteration = pad(totalSpells + 1, 5);
            totalSpells += 1;
            buildXML += "\t\t\t<id-" + thisIteration + ">\n";
            buildXML += addTiefHellResist;
            buildXML += "\t\t\t</id-" + thisIteration + ">\n";
        }
        if (isBarbarian == 1) {
            thisIteration = pad(totalSpells + 1, 5);
            totalSpells += 1;
            buildXML += "\t\t\t<id-" + thisIteration + ">\n";
            buildXML += addBarbarianRage;
            buildXML += "\t\t\t\t<prepared type=\"number\">" + barbRages + "</prepared>\n";
            buildXML += "\t\t\t</id-" + thisIteration + ">\n";
            if (levelBarbarian >= 2) {
                thisIteration = pad(totalSpells + 1, 5);
                totalSpells += 1;
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += addBarbarianDangerSense;
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                thisIteration = pad(totalSpells + 1, 5);
                totalSpells += 1;
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += addBarbarianRecklessAttack;
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
            }
            if (levelBarbarian >= 7) {
                thisIteration = pad(totalSpells + 1, 5);
                totalSpells += 1;
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += addBarbarianFeralInstinct;
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
            }
            if (levelBarbarian >= 9) {
                thisIteration = pad(totalSpells + 1, 5);
                totalSpells += 1;
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += addBarbarianBrutalCritical;
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
            }
            if (levelBarbarian >= 11) {
                thisIteration = pad(totalSpells + 1, 5);
                totalSpells += 1;
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += addBarbarianRelentlessRage;
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
            }

            if (levelBarbarian >= 3) {
                if (barbPrimalPath.match(/Totem Warrior/)) {
                    if (barbTotemSpirit == "Wolf") {
                        thisIteration = pad(totalSpells + 1, 5);
                        totalSpells += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += addBarbarianWolfTotemSpirit;
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                    } else if (barbTotemSpirit == "Eagle") {
                        thisIteration = pad(totalSpells + 1, 5);
                        totalSpells += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += addBarbarianEagleTotemSpirit;
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                    } else if (barbTotemSpirit == "Bear") {
                        thisIteration = pad(totalSpells + 1, 5);
                        totalSpells += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += addBarbarianBearTotemSpirit;
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                    }
                    if (barbBeastAspect == "Wolf") {
                        thisIteration = pad(totalSpells + 1, 5);
                        totalSpells += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += addBarbarianWolfBeastAspect;
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                    } else if (barbBeastAspect == "Eagle") {
                        thisIteration = pad(totalSpells + 1, 5);
                        totalSpells += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += addBarbarianEagleBeastAspect;
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                    } else if (barbBeastAspect == "Bear") {
                        thisIteration = pad(totalSpells + 1, 5);
                        totalSpells += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += addBarbarianbearBeastAspect;
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                    }
                    if (levelBarbarian >= 14) {
                        if (barbTotemAttune == "Bear") {
                            thisIteration = pad(totalSpells + 1, 5);
                                totalSpells += 1;
                                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                                buildXML += addBarbarianTotemicAttunement;
                                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                        }
                    }

                } else if (barbPrimalPath.match(/Berserker/)) {
                    if (levelBarbarian >= 6) {
                        thisIteration = pad(totalSpells + 1, 5);
                        totalSpells += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += addBarbarianMindlessRage;
                        buildXML += "\t\t\t\t<prepared type=\"number\">" + barbRages + "</prepared>\n";
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                    }
                    if (levelBarbarian >= 10) {
                        thisIteration = pad(totalSpells + 1, 5);
                        totalSpells += 1;
                        buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                        buildXML += addBarbarianIntimidatingPresence;
                        buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                    }

                }

            }
        } else if (isBard == 1) {
            thisIteration = pad(totalSpells + 1, 5);
            totalSpells += 1;
            buildXML += "\t\t\t<id-" + thisIteration + ">\n";
            buildXML += addBardicInspiration;
            if (chaMod < 1) {
                useMod = 1;
            } else {
                useMod = chaMod;
            }
            buildXML += "<prepared type=\"number\">" + useMod + "</prepared>\n";
            buildXML += "<source type=\"string\">Bard</source>\n";
            buildXML += "\t\t\t</id-" + thisIteration + ">\n";

            if (levelBard >= 2) {
                thisIteration = pad(totalSpells + 1, 5);
                totalSpells += 1;
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += addBardJackOfAllTrades;
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                thisIteration = pad(totalSpells + 1, 5);
                totalSpells += 1;
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += addBardSongOfRest;
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
            }
            if (levelBard >= 6) {
                thisIteration = pad(totalSpells + 1, 5);
                totalSpells += 1;
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += addBardCountercharm;
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
            }
        } else if (isCleric == 1) {
            // Cleric domains:
            // Arcana, Death, Forge, Grave, Knowledge, Life, Light, Nature, Tempest, Trickery, War
            if (levelCleric >= 2) {
                thisIteration = pad(totalSpells + 1, 5);
                totalSpells += 1;
                buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                buildXML += addClericTurnUndead;
                buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                //console.log("Cleric Domain: " + clericDomain);
                if (clericDomain.match(/Arcana/)) {

                } else if (clericDomain.match(/Death/)) {

                } else if (clericDomain.match(/Forge/)) {

                } else if (clericDomain.match(/Grave/)) {

                } else if (clericDomain.match(/Knowledge/)) {

                } else if (clericDomain.match(/Live/)) {

                } else if (clericDomain.match(/Light/)) {

                } else if (clericDomain.match(/Nature/)) {
                    thisIteration = pad(totalSpells + 1, 5);
                    totalSpells += 1;
                    buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                    buildXML += addClericCharmAnimals;
                    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                } else if (clericDomain.match(/Order/)) {
                    thisIteration = pad(totalSpells + 1, 5);
                    totalSpells += 1;
                    buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                    buildXML += addClericArcaneAbjuration;
                    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                } else if (clericDomain.match(/Tempest/)) {

                } else if (clericDomain.match(/Trickery/)) {

                } else if (clericDomain.match(/War/)) {

                } 
            }
        }
    }

    buildXML += "\t\t</powers>\n";

    baseAC = 0;
    shieldYes = 0;
    shieldAC = 0;
    dexBonus = 10;
    armDis = 0;
    armShieldProf = 0;
    // max2DexArmor
    // max3DexArmor
    // fullDexArmor
    // noDexArmor
    character.inventory.some(function(eachInventory, i) {
        if(eachInventory.definition.filterType == "Armor") {
            if(eachInventory.equipped == true) {
                baseAC += eachInventory.definition.armorClass;
                if(eachInventory.definition.type == "Shield") {
                    shieldYes = 1;
                    shieldAC = eachInventory.definition.armorClass;
                    baseAC -= shieldAC;
                    if(holdProf.includes("Shields")) {
                        // Shield is proficient
                    } else {
                        armShieldProf -= 1;
                    }
                } else {
                    if(eachInventory.definition.stealthCheck == 2) {
                        armDis = 1;
                    }
                    thisArmor = eachInventory.definition.name.toLowerCase().replace(/ /g, "_").replace(/-/g, "_");
                    if(noDexArmor.includes(thisArmor)) {
                        dexBonus = 0;
                        if(holdProf.includes("Heavy Armor")) {
                            // Proficient in heavy armor
                        } else {
                            armShieldProf -= 1;
                        }
                    } else if(max2DexArmor.includes(thisArmor)) {
                        if(dexBonus > 2) {
                            dexBonus = 2;
                        }
                        if(holdProf.includes("Medium Armor")) {
                            // Proficient in medium armor
                        } else {
                            armShieldProf -= 1;
                        }
                    } else if(max3DexArmor.includes(thisArmor)) {
                        if(dexBonus > 3) {
                            dexBonus = 3;
                        }
                    } else if(fullDexArmor.includes(thisArmor)) {
                        if(dexBonus > 4) {
                            dexBonus = 4;
                        }
                        if(holdProf.includes("Light Armor")) {
                            // Proficient in light armor
                        } else {
                            armShieldProf -= 1;
                        }
                    }
                }
            }
        }
    });

    

    // We need to figure out dex bonus: full, max 3, max 2, none
    buildXML += "\t\t<defenses>\n";
    buildXML += "\t\t\t<ac>\n";
    if(baseAC == 0) {
        baseAC += 10;
    }
    buildXML += "\t\t\t\t<armor type=\"number\">" + (baseAC - 10) + "</armor>\n";
    switch(dexBonus) {
        case 0:
            buildXML += "\t\t\t\t<dexbonus type=\"string\">no</dexbonus>\n";
            break;
        case 2:
            buildXML += "\t\t\t\t<dexbonus type=\"string\">max2</dexbonus>\n";
            break;
        case 3:
            buildXML += "\t\t\t\t<dexbonus type=\"string\">max3</dexbonus>\n";
            break;
    }
    if(isSorcerer == 1 && wearingArmor == 0 && usingShield == 0) {
        buildXML += "\t\t\t\t<misc type=\"number\">" + (3 + addBonusOtherAC) + "</misc>\n";
    } else {
        buildXML += "\t\t\t\t<misc type=\"number\">" + (addBonusArmorAC + addBonusOtherAC) + "</misc>\n";
    }
    if(armDis == 1) {
        buildXML += "\t\t\t\t<disstealth type=\"number\">1</disstealth>\n";
    }
    if(isMonk == 1 && wearingArmor == 0 && usingShield == 0) {
        buildXML += "\t\t\t\t<stat2 type=\"string\">wisdom</stat2>\n";
    }
    if(isBarbarian == 1 && wearingArmor == 0) {
        buildXML += "\t\t\t\t<stat2 type=\"string\">constitution</stat2>\n";
    }
	if(armShieldProf < 0) {
        buildXML += "\t\t\t\t<prof type=\"number\">0</prof>\n";
    } else {
        buildXML += "\t\t\t\t<prof type=\"number\">1</prof>\n";
    }
    if(shieldYes == 1) {
        buildXML += "\t\t\t\t<shield type=\"number\">" + shieldAC + "</shield>\n";
    }
	
	buildXML += "\t\t\t\t<temporary type=\"number\">0</temporary>\n";
	buildXML += "\t\t\t</ac>\n";
	buildXML += "\t\t</defenses>\n";

    allXML += buildXML + endXML;
    $('#textHere').val(allXML);

    // 3163468 (Expertise: Double proficiency in Arcana)
    //var exp = getObjects(character, 'type', 'expertise');
    //for(var i in exp) {
    //    var expertise = exp[i];
    //    var pickles = expertise.subType.replace(/-/g, '_');
    //    //console.log(pickles);
    //}
    // characterValues
    // typeId: 26 (updating proficiency for a skill)
    // value: 0 (No selection); 1 (Not Proficient); 2 (Half-Proficient); 3 (Proficient); 4 (Expertise)
    // valueId: 3-Acrobatics; 11-Animal Handling; 6-Arcana; 2-Athletics; 16-Deception; 7-History; 12-Insight
    // valudId: 17-Intimidation; 8-Investigation; 13-Medicine; 9-Nature; 14-Perception; 18-Performance
    // valueId: 19-Persuasion; 10-Religion; 4-Sleight of Hand; 5-Stealth; 15-Survival
    // 2: Athletics
    // 3: Acrobatics
    // 4: Sleight of Hand
    // 5: Stealth
    // 6: Arcana
    // 7: History
    // 8: Investigation
    // 9: Nature
    // 10: Religion
    // 11: Animal Handling
    // 12: Insight
    // 13: Medicine
    // 14: Perception
    // 15: Survival
    // 16: Deception
    // 17: Intimidation
    // 18: Performance
    // 19: Persuasion
}

}

const getTotalAbilityScore = function(character, scoreId) {
    var index = scoreId-1;
    var base = (character.stats[index].value == null ? 10 : character.stats[index].value),
        bonus = (character.bonusStats[index].value == null ? 0 : character.bonusStats[index].value),
        override = (character.overrideStats[index].value == null ? 0 : character.overrideStats[index].value),
        total = base + bonus,
        modifiers = getObjects(character, '', _ABILITY[_ABILITIES[scoreId]] + "-score");
    if(override > 0) total = override;
    if(modifiers.length > 0) {
        var used_ids = [];
        for(var i = 0; i < modifiers.length; i++){
            if(modifiers[i].type == 'bonus' && used_ids.indexOf(modifiers[i].id) == -1) {
                total += modifiers[i].value;
                used_ids.push(modifiers[i].id);
            }
        }
    }
    return total;
};

const getObjects = function(obj, key, val) {
    var objects = [];
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        if (typeof obj[i] == 'object') {
            objects = objects.concat(getObjects(obj[i], key, val));
        } else
        if (i == key && obj[i] == val || i == key && val == '') { //
            objects.push(obj);
        } else if (obj[i] == val && key == ''){
            if (objects.lastIndexOf(obj) == -1){
                objects.push(obj);
            }
        }
    }
    return objects;
};

function replaceDash(str) {
    firstStep = str.replace(/-/g, "_");
    return firstStep.replace(/ /g, "_");
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function pad(num, size) {
    var s = num + "";

    while (s.length < size) s = "0" + s;
    return s;
}

function invokeSaveAsDialog(file, fileName) {
    if (!file) {
        throw 'Blob object is required.';
    }

    if (!file.type) {
        file.type = 'video/webm';
    }

    var fileExtension = file.type.split('/')[1];

    if (fileName && fileName.indexOf('.') !== -1) {
        var splitted = fileName.split('.');
        fileName = splitted[0];
        fileExtension = splitted[1];
    }

    var fileFullName = (fileName || (Math.round(Math.random() * 9999999999) + 888888888)) + '.' + fileExtension;

    if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
    } else if (typeof navigator.msSaveBlob !== 'undefined') {
        return navigator.msSaveBlob(file, fileFullName);
    }

    var hyperlink = document.createElement('a');
    hyperlink.href = URL.createObjectURL(file);
    hyperlink.target = '_blank';
    hyperlink.download = fileFullName;

    if (!!navigator.mozGetUserMedia) {
        hyperlink.onclick = function() {
            (document.body || document.documentElement).removeChild(hyperlink);
        };
        (document.body || document.documentElement).appendChild(hyperlink);
    }

    var evt = new MouseEvent('click', {
        view: window,
        bubbles: true,
        cancelable: true
    });

    hyperlink.dispatchEvent(evt);

    if (!navigator.mozGetUserMedia) {
        URL.revokeObjectURL(hyperlink.href);
    }
}

function fixQuote(badString) {
    if(badString == "" || badString == null) {
        return "";
    }
    return badString.replace(/\n/g, '\n').replace(/\u2019/g, "'").replace(/\u2014/g, "-").replace(/\"/g, "&#34;").replace(/\u2022/g, ":").replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
}

function convert_case(str) {
    var lower = str.toLowerCase();
    return lower.replace(/(^| )(w)/g, function(x) {
        return x.toUpperCase();
    });
}

function remove_tags_traits(badString) {
    var tempString1 = badString.replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">");
    var tempString2 = tempString1.replace(/\&rsquo\;/g, "'").replace(/\&lsquo\;/g, "'").replace(/\&rdquo\;/g, "\"").replace(/\&ldquo\;/g, "\"");
    var tempString3 = tempString2.replace(/\&\#34\;/g, "\"").replace(/<br\>/g, "<br />").replace(/\&ndash\;/g, "-");
    var tempString4 = tempString3.replace(/<th style/g, "<td style").replace(/<\/th\>/g, "</td>").replace(/<th rowspan/g, "<td rowspan").replace(/<th colspan/g, "<td colspan").replace(/<th\>/g, "<td>");
    var tempString5 = tempString4.replace(/<span\>/g, "").replace(/<\/span\>/g, "").replace(/<span style\=\"font-weight\:400\"\>/g, "");
    var tempString6 = tempString5.replace(/\&nbsp\;/g, " ").replace(/<br\>/g, "\n").replace(/<h5\>/g, "<p><b>").replace(/<\/h5\>/g, "</b></p>").replace(/<span style\=\"color\:\#[a-zA-Z0-9]{3}\"\>/g, "").replace(/<span style\=\"color\:\#[a-zA-Z0-9]{6}\"\>/g, "");

    return tempString6;
}

function remove_tags_featureSubclass(badString) {
    // First things first, let's create an array of all the individual lines, then go through them and see what we can fix.
    //var testTables = badString.split("\n");
    //console.log("Array length: " + testTables.length);
    //for(i = 0; i < testTables.length - 1; i++) {
    //    if (testTables[i].match(/^\&lt\;p style/)) {
    //        console.log("Found one: " + testTables[i]);
    //    }
    //}
    // Ok, so we need to fix tables. From start table tag to end table tag, remove <p> & </p>
    var tempString1 = badString.replace(/\&lt\;/g, "<").replace(/\&gt\;/g, ">").replace(/\&\#34\;/g, "\"").replace(/\n/g, "").replace(/\&ndash\;/g, "-");
    var tempString2 = tempString1.replace(/\&rsquo\;/g, "'").replace(/\&lsquo\;/g, "'").replace(/\&rdquo\;/g, "\"").replace(/\&ldquo\;/g, "\"");
    var tableSubstring1 = tempString2.indexOf("<table");
    var tableSubstring2 = tempString2.indexOf("</table");
    var string01 = tempString2.substring(0, tableSubstring1);
    var string03 = tempString2.substring(tableSubstring2);
    var tableStringFull = tempString2.substring(tableSubstring1, tableSubstring2);
    var string02 = tableStringFull.replace(/<p\>/g, "").replace(/<\/p\>/g, "").replace(/<p style\=\"text-align\:left\"\>/g, "");
    //var string02 = tableStringFull;
    var newFullString = string01 + string02 + string03;
    var tempString3 = newFullString.replace(/<th style/g, "<td style").replace(/<\/th\>/g, "</td>").replace(/<th rowspan/g, "<td rowspan").replace(/<th colspan/g, "<td colspan").replace(/<th\>/g, "<td>");
    var tempString4 = tempString3.replace(/<span\>/g, "").replace(/<\/span\>/g, "").replace(/<span style\=\"font-weight\:400\"\>/g, "").replace(/<span style\=\"color\:\#47d18c\"\>/g, "").replace(/<span style\=\"color\:\#704cd9\"\>/g, "");
    var tempString5 = tempString4.replace(/\&nbsp\;/g, " ").replace(/<br\>/g, "\n").replace(/<h5\>/g, "<p><b>").replace(/<\/h5\>/g, "</b></p>").replace(/<thead\>/g, "").replace(/<\/thead\>/g, "").replace(/<tbody\>/g, "").replace(/<\/tbody\>/g, "");
    return tempString5;
}

const getPactMagicSlots = function(level) {

    // 1-2 1st level
    // 3-4 2nd level
    // 5-6 3rd level
    // 7-8 4th level
    // 9+ 5th level

    switch(level){
        case 1:
            return 1;

        case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 10:
            return 2;

        case 11: case 12: case 13: case 14: case 15: case 16:
            return 3;

        default:
            return 4;
    }
    return 0;
};

function getSpellSlots(slotClass, slotLevel, slotSubClass) {
    if((slotClass === "bard") || (slotClass === "cleric") || (slotClass === "druid") || (slotClass === "sorcerer") || (slotClass === "wizard")) {
        if (slotLevel == 1) {
            charSpellSlots1 = 2;
        } else if (slotLevel == 2) {
            charSpellSlots1 = 3;
        } else if (slotLevel == 3) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 2;
        } else if (slotLevel == 4) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
        } else if (slotLevel == 5) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 2;
        } else if (slotLevel == 6) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
        } else if (slotLevel == 7) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 1;
        } else if (slotLevel == 8) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 2;
        } else if (slotLevel == 9) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 1;
        } else if (slotLevel == 10) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
        } else if (slotLevel == 11) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
            charSpellSlots6 = 1;
        } else if (slotLevel == 12) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
            charSpellSlots6 = 1;
        } else if (slotLevel == 13) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
            charSpellSlots6 = 1;
            charSpellSlots7 = 1;
        } else if (slotLevel == 14) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
            charSpellSlots6 = 1;
            charSpellSlots7 = 1;
        } else if (slotLevel == 15) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
            charSpellSlots6 = 1;
            charSpellSlots7 = 1;
            charSpellSlots8 = 1;
        } else if (slotLevel == 16) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
            charSpellSlots6 = 1;
            charSpellSlots7 = 1;
            charSpellSlots8 = 1;
        } else if (slotLevel == 17) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
            charSpellSlots6 = 1;
            charSpellSlots7 = 1;
            charSpellSlots8 = 1;
            charSpellSlots9 = 1;
        } else if (slotLevel == 18) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 3;
            charSpellSlots6 = 1;
            charSpellSlots7 = 1;
            charSpellSlots8 = 1;
            charSpellSlots9 = 1;
        } else if (slotLevel == 19) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 3;
            charSpellSlots6 = 2;
            charSpellSlots7 = 1;
            charSpellSlots8 = 1;
            charSpellSlots9 = 1;
        } else if (slotLevel == 20) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 3;
            charSpellSlots6 = 2;
            charSpellSlots7 = 2;
            charSpellSlots8 = 1;
            charSpellSlots9 = 1;
        }
    } else if(slotClass === "paladin" || slotClass === "ranger") {
        if (slotLevel == 2) {
            charSpellSlots1 = 2;
        } else if (slotLevel == 3) {
            charSpellSlots1 = 3;
        } else if (slotLevel == 4) {
            charSpellSlots1 = 3;
        } else if (slotLevel == 5) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 2;
        } else if (slotLevel == 6) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 2;
        } else if (slotLevel == 7) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
        } else if (slotLevel == 8) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
        } else if (slotLevel == 9) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 2;
        } else if (slotLevel == 10) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 2;
        } else if (slotLevel == 11) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
        } else if (slotLevel == 12) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
        } else if (slotLevel == 13) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 1;
        } else if (slotLevel == 14) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 1;
        } else if (slotLevel == 15) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 2;
        } else if (slotLevel == 16) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 2;
        } else if (slotLevel == 17) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 1;
        } else if (slotLevel == 18) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 1;
        } else if (slotLevel == 19) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
        } else if (slotLevel == 20) {
            charSpellSlots1 = 4;
            charSpellSlots2 = 3;
            charSpellSlots3 = 3;
            charSpellSlots4 = 3;
            charSpellSlots5 = 2;
        }
    } else if((slotClass === "fighter" || slotClass === "rogue") && slotLevel >= 3 && slotSubClass != null) {
        if(slotSubClass == "ArcaneTrickster" || slotSubClass == "Eldritch Knight") {
            if (slotLevel == 3) {
                charSpellSlots1 = 2;
            } else if (slotLevel == 4) {
                charSpellSlots1 = 3;
            } else if (slotLevel == 5) {
                charSpellSlots1 = 3;
            } else if (slotLevel == 6) {
                charSpellSlots1 = 3;
            } else if (slotLevel == 7) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 2;
            } else if (slotLevel == 8) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 2;
            } else if (slotLevel == 9) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 2;
            } else if (slotLevel == 10) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
            } else if (slotLevel == 11) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
            } else if (slotLevel == 12) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
                charSpellSlots3 = 3;
            } else if (slotLevel == 13) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
                charSpellSlots3 = 2;
            } else if (slotLevel == 14) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
                charSpellSlots3 = 2;
            } else if (slotLevel == 15) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
                charSpellSlots3 = 2;
            } else if (slotLevel == 16) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
                charSpellSlots3 = 3;
            } else if (slotLevel == 17) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
                charSpellSlots3 = 3;
            } else if (slotLevel == 18) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
                charSpellSlots3 = 3;
            } else if (slotLevel == 19) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
                charSpellSlots3 = 3;
                charSpellSlots4 = 1;
            } else if (slotLevel == 20) {
                charSpellSlots1 = 4;
                charSpellSlots2 = 3;
                charSpellSlots3 = 3;
                charSpellSlots4 = 1;
            }
        }
    } else {
        //charSpellSlots1 = 0;
        //charSpellSlots2 = 0;
        //charSpellSlots3 = 0;
        //charSpellSlots4 = 0;
        //charSpellSlots5 = 0;
        //charSpellSlots6 = 0;
        //charSpellSlots7 = 0;
        //charSpellSlots8 = 0;
        //charSpellSlots9 = 0;
    }
}
  
addTiefHellResist = " \
\t\t\t\t<actions>\n \
\t\t\t\t\t<id-00001>\n \
\t\t\t\t\t\t<durmod type=\"number\">0</durmod>\n \
\t\t\t\t\t\t<label type=\"string\">Hellish Resistance; RESIST: fire</label>\n \
\t\t\t\t\t\t<order type=\"number\">1</order>\n \
\t\t\t\t\t\t<targeting type=\"string\">self</targeting>\n \
\t\t\t\t\t\t<type type=\"string\">effect</type>\n \
\t\t\t\t\t</id-00001>\n \
\t\t\t\t</actions>\n \
\t\t\t\t<cast type=\"number\">0</cast>\n \
\t\t\t\t<description type=\"formattedtext\">\n \
\t\t\t\t\t<p>You have resistance to fire damage.</p>\n \
\t\t\t\t</description>\n \
\t\t\t\t<group type=\"string\">Racial Traits</group>\n \
\t\t\t\t<level type=\"number\">0</level>\n \
\t\t\t\t<locked type=\"number\">1</locked>\n \
\t\t\t\t<name type=\"string\">Tiefling: Hellish Resistance</name>\n \
\t\t\t\t<prepared type=\"number\">0</prepared>\n \
\t\t\t\t<ritual type=\"number\">0</ritual>\n \
\t\t\t\t<source type=\"string\">Tiefling</source>\n \
\t\t\t\t<type type=\"string\">racial</type>\n";

addMonkUnarmedStrike = " \
\t\t\t\t<attackbonus type=\"number\">0</attackbonus> \
\t\t\t\t<attackstat type=\"string\">dexterity</attackstat> \
\t\t\t\t<carried type=\"number\">1</carried> \
\t\t\t\t<damagelist> \
\t\t\t\t<id-00001> \
\t\t\t\t<bonus type=\"number\">0</bonus> \
\t\t\t\t<dice type=\"dice\">d4</dice> \
\t\t\t\t<stat type=\"string\">base</stat> \
\t\t\t\t<statmult type=\"number\">1</statmult> \
\t\t\t\t<type type=\"string\">bludgeoning</type> \
\t\t\t\t</id-00001> \
\t\t\t\t</damagelist> \
\t\t\t\t<maxammo type=\"number\">0</maxammo> \
\t\t\t\t<name type=\"string\">Unarmed Strike</name> \
\t\t\t\t<prof type=\"number\">1</prof> \
\t\t\t\t<shortcut type=\"windowreference\"> \
\t\t\t\t<class></class> \
\t\t\t\t<recordname></recordname> \
\t\t\t\t</shortcut> \
\t\t\t\t<type type=\"number\">0</type>\n";

addBarbarianRage = " \
\t\t\t\t<actions>\n \
\t\t\t\t\t<id-00001>\n \
\t\t\t\t\t\t<durmod type=\"number\">1</durmod>\n \
\t\t\t\t\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t\t\t\t\t<label type=\"string\">Rage; ADVCHK: strength; ADVSAV: strength; DMG: 4, melee; RESIST: bludgeoning, piercing, slashing</label>\n \
\t\t\t\t\t\t<order type=\"number\">1</order>\n \
\t\t\t\t\t\t<targeting type=\"string\">self</targeting>\n \
\t\t\t\t\t\t<type type=\"string\">effect</type>\n \
\t\t\t\t\t\</id-00001>\n \
\t\t\t\t</actions>\n \
\t\t\t\t<cast type=\"number\">0</cast>\n \
\t\t\t\t<description type=\"formattedtext\">\n \
\t\t\t\t\t<p>In battle, you fight with primal ferocity. On your turn, you can enter a rage as a bonus action. While raging, you gain the following benefits if you aren't wearing heavy armor:</p>\n \
\t\t\t\t\t<list>\n \
\t\t\t\t\t\t<li>You have advantage on Strength checks and Strength saving throws.</li>\n \
\t\t\t\t\t\t<li>When you make a melee weapon attack using Strength, you gain a bonus to the damage roll that increases as you gain levels as a barbarian, as shown in the Rage Damage column of the Barbarian table.</li>\n \
\t\t\t\t\t\t<li>You have resistance to bludgeoning, piercing, and slashing damage.</li>\n \
\t\t\t\t\t</list>\n \
\t\t\t\t\t\t<p>If you are able to cast spells, you can't cast them while raging.</p>\n \
\t\t\t\t\t\t<p>Your rage lasts for 1 minute. It ends early if you are knocked unconscious or if your turn ends and you have neither attacked a hostile creature since your last turn nor taken damage since then. You can also end your rage on your turn (no action required).</p>\n \
\t\t\t\t\t\t<p>Once you have raged the number of times shown for your barbarian level in the Rages column of the Barbarian table, you must finish a long rest before you can rage again.</p>\n \
\t\t\t\t</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
\t\t\t\t<level type=\"number\">0</level>\n \
\t\t\t\t<locked type=\"number\">1</locked>\n \
\t\t\t\t<name type=\"string\">Rage</name>\n \
\t\t\t\t<ritual type=\"number\">0</ritual>\n \
\t\t\t\t<source type=\"string\">Barbarian</source>\n";

addBarbarianDangerSense = " \
<actions>\n \
<id-00001>\n \
<apply type=\"string\">action</apply>\n \
<durmod type=\"number\">0</durmod>\n \
<label type=\"string\">Danger Sense; ADVSAV: dexterity</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 2nd level, you gain an uncanny sense of when things nearby aren't as they should be, giving you an edge when you dodge away from danger.</p>\n \
<p>You have advantage on Dexterity saving throws against effects that originate within 30 feet of you, such as a trap or a spellcaster within that range. To gain this benefit, you cannot be blinded, deafened, or incapacitated.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Danger Sense</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Barbarian</source>\n";

addBarbarianWolfTotemSpirit = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">1</durmod>\n \
<durunit type=\"string\">minute</durunit>\n \
<label type=\"string\">Rage Wolf; ADVATK: melee</label>\n \
<order type=\"number\">3</order>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 3rd level, when you adopt this path, you choose a totem spirit and gain its feature. You must make or acquire a physical totem object- an amulet or similar adornment-that incorporates fur or feathers, claws, teeth, or bones of the totem animal. At your option, you also gain minor physical attributes that are reminiscent of your totem spirit. For example, if you have a bear totem spirit, you might be unusually hairy and thick&#62;skinned, or if your totem is the eagle, your eyes turn bright yellow.</p>\n \
<p>Your totem animal might be an animal related to those listed here but more appropriate to your homeland. For example, you could choose a hawk or vulture in place of an eagle.</p>\n \
<p><b>Bear. </b>While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment.</p>\n \
<p><b>Eagle. </b>While you're raging and aren't wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease.</p>\n \
<p><b>Wolf. </b>While you're raging, your friends have advantage on melee attack rolls against any hostile creature within 5 feet of you. The spirit of the wolf makes you a leader of hunters.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Totem Spirit (Wolf)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Path of the Totem Warrior</specialization>\n";

addBarbarianEagleTotemSpirit = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">1</durmod>\n \
<durunit type=\"string\">minute</durunit>\n \
<label type=\"string\">Rage Eagle; ADVCHK: strength; ADVSAV: strength; DMG: 4, melee; GRANTDISATK: opportunity; RESIST: bludgeoning, piercing, slashing</label>\n \
<order type=\"number\">2</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 3rd level, when you adopt this path, you choose a totem spirit and gain its feature. You must make or acquire a physical totem object- an amulet or similar adornment-that incorporates fur or feathers, claws, teeth, or bones of the totem animal. At your option, you also gain minor physical attributes that are reminiscent of your totem spirit. For example, if you have a bear totem spirit, you might be unusually hairy and thick&#62;skinned, or if your totem is the eagle, your eyes turn bright yellow.</p>\n \
<p>Your totem animal might be an animal related to those listed here but more appropriate to your homeland. For example, you could choose a hawk or vulture in place of an eagle.</p>\n \
<p><b>Bear. </b>While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment.</p>\n \
<p><b>Eagle. </b>While you're raging and aren't wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease.</p>\n \
<p><b>Wolf. </b>While you're raging, your friends have advantage on melee attack rolls against any hostile creature within 5 feet of you. The spirit of the wolf makes you a leader of hunters.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Totem Spirit (Eagle)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Path of the Totem Warrior</specialization>\n";

addBarbarianBearTotemSpirit = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">1</durmod>\n \
<durunit type=\"string\">minute</durunit>\n \
<label type=\"string\">Rage Bear; ADVCHK: strength; ADVSAV: strength; DMG: 4, melee; RESIST: all, !psychic</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 3rd level, when you adopt this path, you choose a totem spirit and gain its feature. You must make or acquire a physical totem object- an amulet or similar adornment-that incorporates fur or feathers, claws, teeth, or bones of the totem animal. At your option, you also gain minor physical attributes that are reminiscent of your totem spirit. For example, if you have a bear totem spirit, you might be unusually hairy and thick&#62;skinned, or if your totem is the eagle, your eyes turn bright yellow.</p>\n \
<p>Your totem animal might be an animal related to those listed here but more appropriate to your homeland. For example, you could choose a hawk or vulture in place of an eagle.</p>\n \
<p><b>Bear. </b>While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment.</p>\n \
<p><b>Eagle. </b>While you're raging and aren't wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease.</p>\n \
<p><b>Wolf. </b>While you're raging, your friends have advantage on melee attack rolls against any hostile creature within 5 feet of you. The spirit of the wolf makes you a leader of hunters.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Totem Spirit (Bear)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Path of the Totem Warrior</specialization>\n";

addBarbarianWolfBeastAspect = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">0</durmod>\n \
<label type=\"string\">Aspect of the Beast (Wolf); Special tracking and movement</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 6th level, you gain a magical benefit based on the totem animal of your choice. You can choose the same animal you selected at 3rd level or a different one.</p>\n \
<p><b>Bear. </b>You gain the might of a bear. Your carrying capacity (including maximum load and maximum lift) is doubled, and you have advantage on Strength checks made to push, pull, lift, or break objects.</p>\n \
<p><b>Eagle. </b>You gain the eyesight of an eagle. You can see up to 1 mile away with no difficulty, able to discern even fine details as though looking at something no more than 100 feet away from you. Additionally, dim light doesn't impose disadvantage on your Wisdom (Perception) checks.</p>\n \
<p><b>Wolf. </b>You gain the hunting sensibilities of a wolf. You can track other creatures while traveling at a fast pace, and you can move stealthily while traveling at a normal pace (see chapter 8 for rules on travel pace).</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Aspect of the Beast (Wolf)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<school type=\"string\">Class</school>\n \
<source type=\"string\">Barbarian</source>\n \
<specialization type=\"string\">Path of the Totem Warrior</specialization>\n";

addBarbarianEagleBeastAspect = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">0</durmod>\n \
<label type=\"string\">Aspect of the Beast (Eagle); Special sight</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 6th level, you gain a magical benefit based on the totem animal of your choice. You can choose the same animal you selected at 3rd level or a different one.</p>\n \
<p><b>Bear. </b>You gain the might of a bear. Your carrying capacity (including maximum load and maximum lift) is doubled, and you have advantage on Strength checks made to push, pull, lift, or break objects.</p>\n \
<p><b>Eagle. </b>You gain the eyesight of an eagle. You can see up to 1 mile away with no difficulty, able to discern even fine details as though looking at something no more than 100 feet away from you. Additionally, dim light doesn't impose disadvantage on your Wisdom (Perception) checks.</p>\n \
<p><b>Wolf. </b>You gain the hunting sensibilities of a wolf. You can track other creatures while traveling at a fast pace, and you can move stealthily while traveling at a normal pace (see chapter 8 for rules on travel pace).</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Aspect of the Beast (Eagle)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<school type=\"string\">Class</school>\n \
<source type=\"string\">Barbarian</source>\n \
<specialization type=\"string\">Path of the Totem Warrior</specialization>\n";

addBarbarianBearBeastAspect = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">0</durmod>\n \
<label type=\"string\">Aspect of the Beast (Bear); ADVCHK: strength;</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 6th level, you gain a magical benefit based on the totem animal of your choice. You can choose the same animal you selected at 3rd level or a different one.</p>\n \
<p><b>Bear. </b>You gain the might of a bear. Your carrying capacity (including maximum load and maximum lift) is doubled, and you have advantage on Strength checks made to push, pull, lift, or break objects.</p>\n \
<p><b>Eagle. </b>You gain the eyesight of an eagle. You can see up to 1 mile away with no difficulty, able to discern even fine details as though looking at something no more than 100 feet away from you. Additionally, dim light doesn't impose disadvantage on your Wisdom (Perception) checks.</p>\n \
<p><b>Wolf. </b>You gain the hunting sensibilities of a wolf. You can track other creatures while traveling at a fast pace, and you can move stealthily while traveling at a normal pace (see chapter 8 for rules on travel pace).</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Aspect of the Beast (Bear)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<school type=\"string\">Class</school>\n \
<source type=\"string\">Barbarian</source>\n \
<specialization type=\"string\">Path of the Totem Warrior</specialization>\n";

addBarbarianRecklessAttack = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">1</durmod>\n \
<label type=\"string\">Reckless Attack; ADVATK: melee; GRANTADVATK:</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Starting at 2nd level, you can draw on your reserve of rage to throw aside all concern for defense and attack with fierce desperation. When you do so, you have advantage on melee weapon attack rolls using Strength during your turn, but attack rolls against you have advantage until your next turn.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Reckless Attack</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Barbarian</source>\n";

addBarbarianFeralInstinct = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">0</durmod>\n \
<label type=\"string\">Feral Instinct; ADViNIT:</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>By 7th level, your instincts are so honed that you have advantage on initiative rolls.</p>\n \
<p>Additionally, if you are surprised at the beginning of combat and aren't incapacitated, you can act normally on your first turn, but only if you enter your rage on that turn.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Feral Instinct</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Barbarian</source>\n";

addBarbarianBrutalCritical = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">0</durmod>\n \
<label type=\"string\">Brutal Critical; DMG: 3d8, melee, critical</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Beginning at 9th level, you can roll one additional weapon damage die when determining the extra damage for a critical hit with a melee attack.</p>\n \
<p>This increases to two additional dice at 13th level and three additional dice at 17th level.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Brutal Critical</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n";

addBarbarianRelentlessRage = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">0</durmod>\n \
<label type=\"string\">Relentless Rage - CON save;</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Starting at 11th level, your rage can keep you fighting despite grievous wounds. If you drop to 0 hit points while you're raging and don't die outright, you can make a DC 10 Constitution saving throw. If you succeed, you drop to 1 hit point instead.</p>\n \
<p>Each time you use this feature after the first, the DC increases by 5. When you finish a short or long rest, the DC resets to 10.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Relentless Rage</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Barbarian</source>\n";

addBarbarianTotemicAttunement = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">1</durmod>\n \
<durunit type=\"string\">minute</durunit>\n \
<label type=\"string\">GRANTDISATK:</label>\n \
<order type=\"number\">1</order>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 14th level, you gain a magical benefit based on a totem animal of your choice. You can choose the same animal you selected at 3rd level or a different one.</p>\n \
<p><b>Bear. </b>While you're raging, any creature within 5 feet of you that's hostile to you has disadvantage on attack rolls against targets other than you. An enemy is immune to this effect if it can't see or hear you or if it can't be frightened.</p>\n \
<p><b>Eagle. </b>While raging, you have a fly speed equal to your current speed. This benefit works only in short bursts; you fall if you end your turn in the air and nothing else is holding you aloft.</p>\n \
<p><b>Wolf. </b>While you're raging, you can use a bonus action on your turn to knock a Large or smaller creature prone when you hit it with melee weapon attack.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Totemic Attunement (Bear)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Path of the Totem Warrior</specialization>\n";

addBarbarianMindlessRage = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">1</durmod>\n \
<durunit type=\"string\">minute</durunit>\n \
<label type=\"string\">Rage; ADVCHK: strength; ADVSAV: strength; DMG: 4, melee; RESIST: bludgeoning, piercing, slashing; IMMUNE: charmed; IMMUNE: frightened</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Beginning at 6th level, you cannot be charmed or frightened while raging. If you are charmed or frightened when you enter your rage, the effect is suspended for the duration of the rage.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Mindless Rage</name>\n \
<prepared type=\"number\">6</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Path of the Berserker</specialization>\n";

addBarbarianIntimidatingPresence = " \
<actions>\n \
<id-00001>\n \
<atkmod type=\"number\">0</atkmod>\n \
<atkprof type=\"number\">1</atkprof>\n \
<order type=\"number\">1</order>\n \
<savedcbase type=\"string\">ability</savedcbase>\n \
<savedcmod type=\"number\">0</savedcmod>\n \
<savedcprof type=\"number\">1</savedcprof>\n \
<savedcstat type=\"string\">charisma</savedcstat>\n \
<savetype type=\"string\">wisdom</savetype>\n \
<type type=\"string\">cast</type>\n \
</id-00001>\n \
<id-00002>\n \
<durmod type=\"number\">1</durmod>\n \
<label type=\"string\">Frightened</label>\n \
<order type=\"number\">2</order>\n \
<type type=\"string\">effect</type>\n \
</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Beginning at 10th level, you can use your action to roar frighteningly at someone. When you do so, choose one creature that you can see within 30 feet of you. If the creature can see or hear you, it must succeed on a Wisdom saving throw (DC equal to 8 + your proficiency bonus + your Charisma modifier) or be frightened of you until the end of your next turn. On subsequent turns, you can use your action to extend the duration of this effect on the frightened creature until the end of your next turn. This effect ends if the creature ends it turn out of line of sight or more than 60 feet away from you.</p>\n \
<p>If the creature succeeds on its saving throw, you can't use this feature on that creature again for 24 hours.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Intimidating Presence</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Path of the Berserker</specialization>\n";

addBardJackOfAllTrades = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">0</durmod>\n \
<label type=\"string\">Jack of all Trades; INIT:[HPRF]</label>\n \
<order type=\"number\">1</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
<id-00002>\n \
<apply type=\"string\">roll</apply>\n \
<durmod type=\"number\">0</durmod>\n \
<label type=\"string\">Jack of all Trades; CHECK:[HPRF], all</label>\n \
<order type=\"number\">2</order>\n \
<targeting type=\"string\">self</targeting>\n \
<type type=\"string\">effect</type>\n \
</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Starting at 2nd level, you can add half your proficiency bonus, rounded down, to any ability check you make that doesn't already include that bonus.</p>\n \
</description>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Jack of All Trades</name>\n \
<prepared type=\"number\">0</prepared>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<source type=\"string\">Bard</source>\n";

addBardicInspiration = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">10</durmod>\n \
<durunit type=\"string\">minute</durunit>\n \
<label type=\"string\">Bardic Inspiration;</label>\n \
<order type=\"number\">1</order>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>You can inspire others through stirring words or music. To do so, you use a bonus action on your turn to choose one creature other than yourself within 60 feet of you who can hear you. That creature gains one Bardic Inspiration die, a d6.</p>\n \
<p>Once within the next 10 minutes, the creature can roll the die and add the number rolled to one ability check, attack roll, or saving throw that it just made. The creature can wait until after it rolls the die for the ability check, attack roll, or saving throw, but before the DM says whether or not it succeeds or fails before deciding to use the Bardic Inspiration die. Once the Bardic Inspiration die is rolled, it is lost. A creature can have only one Bardic Inspiration die at a time.</p>\n \
<p>You can use this feature a number of times equal to your Charisma modifier (a minimum of once). You regain any expended uses when you finish a long rest.</p>\n \
<p>Your Bardic Inspiration die changes when you reach certain levels in this class. The die becomes a d8 at 5th level, a d10 at 10th level, and a d12 at 15th level.</p>\n \
</description>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<name type=\"string\">Bardic Inspiration</name>\n";

addBardSongOfRest = " \
<actions>\n \
<id-00001>\n \
<heallist>\n \
<id-00001>\n \
<bonus type=\"number\">0</bonus>\n \
<dice type=\"dice\">d12</dice>\n \
</id-00001>\n \
</heallist>\n \
<order type=\"number\">1</order>\n \
<type type=\"string\">heal</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Beginning at 2nd level, you can use soothing music or oration to help revitalize your wounded allies during a short rest. If you or any friendly creature who can hear your performance regains any hit points during the short rest, that creature regains 1d6 extra hit points at the end of the rest. A creature regains the extra hit points only if it spends one or more Hit Dice at the end of the short rest.</p>\n \
<p>The extra hit points increase when you reach certain levels in this class: 1d8 at 9th level, 1d10 at 13th level, and 1d12 at 17th level.</p>\n \
</description>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Song of Rest</name>\n \
<prepared type=\"number\">0</prepared>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<source type=\"string\">Bard</source>\n";

addBardCountercharm = " \
<actions>\n \
<id-00001>\n \
<durmod type=\"number\">1</durmod>\n \
<label type=\"string\">Countercharm;</label>\n \
<order type=\"number\">1</order>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 6th level, you gain the ability to use musical notes or words of power to disrupt mind5 influencing effects. As an action, you can start a performance that lasts until the end of your next turn. During that time, you and any friendly creature within 30 feet of you have advantage on saving throws against being frightened or charmed. A creature must be able to hear you to gain this benefit. The performance ends early if you are incapacitated or silenced or you voluntarily end it (no action required).</p>\n \
</description>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Countercharm</name>\n \
<prepared type=\"number\">0</prepared>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<source type=\"string\">Bard</source>\n";

addClericTurnUndead = " \
<actions>\n \
<id-00001>\n \
<order type=\"number\">1</order>\n \
<savetype type=\"string\">wisdom</savetype>\n \
<type type=\"string\">cast</type>\n \
</id-00001>\n \
<id-00002>\n \
<durmod type=\"number\">1</durmod>\n \
<durunit type=\"string\">minute</durunit>\n \
<label type=\"string\">Turned</label>\n \
<order type=\"number\">2</order>\n \
<type type=\"string\">effect</type>\n \
</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>At 2nd level, you gain the ability to channel divine energy directly from your deity, using that energy to fuel magical effects. You start with two such effects - Turn Undead and an effect determined by your domain. Some domains grant you additional effects as you advance in levels, as noted in the domain description.</p>\n \
<p>When you use your Channel Divinity, you choose which effect to create. You must then finish a short or long rest to use your Channel Divinity again.</p>\n \
<p>Some Channel Divinity effects require saving throws. When you use such an effect from this class, the DC equals your cleric spell save DC.</p>\n \
<p>Beginning at 6th level, you can use your Channel Divinity twice between rests, and beginning at 18th level, you can use it three times between rests. When you finish a short or long rest, you regain your expended uses.</p>\n \
<p><b>Channel Divinity: </b>Turn Undead</p>\n \
<p>As an action, you present your holy symbol and speak a prayer censuring the undead. Each undead that can see or hear you within 30 feet of you must make a Wisdom saving throw. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.</p>\n \
<p>A turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly move to a space within 30 feet of you. It also can't take reactions. For its action, it can use only the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Turn Undead</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Cleric</source>\n";

addClericArcaneAbjuration = " \
<actions>\n \
<id-00001>\n \
<order type=\"number\">1</order>\n \
<savetype type=\"string\">wisdom</savetype>\n \
<type type=\"string\">cast</type>\n \
</id-00001>\n \
<id-00002>\n \
<durmod type=\"number\">1</durmod>\n \
<durunit type=\"string\">minute</durunit>\n \
<label type=\"string\">Turned</label>\n \
<order type=\"number\">2</order>\n \
<type type=\"string\">effect</type>\n \
</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Starting at 2nd level, you can use your Channel Divinity to abjure otherworldly creatures.</p>\n \
<p>As an action, you present your holy symbol, and one celestial, elemental, fey, or fiend of your choice that is within 30 feet of you must make a Wisdom saving throw, provided that the creature can see or hear you. If the creature fails its saving throw, it is turned for 1 minute or until it takes any damage.</p>\n \
<p>A turned creature must spend its turns trying to move as far away from you as it can, and it can't willingly end its move in a space within 30 feet of you. It also can't take reactions. For its action, it can only use the Dash action or try to escape from an effect that prevents it from moving. If there's nowhere to move, the creature can use the Dodge action.</p>\n \
<p>After you reach 5th level, when a creature fails its saving throw against your Arcane Abjuration feature, the creature is banished for 1 minute (as in the banishment spell, no concentration required) if it isn't on its plane of origin and its challenge rating is at or below a certain threshold, as shown on the Arcane Banishment table.</p>\n \
<table>\n \
<tr>\n \
<td colspan=\"5\"><b>Arcane Banishment</b></td>\n \
</tr>\n \
<tr>\n \
<td>Cleric Level</td>\n \
<td colspan=\"4\">Banishes Creatures of CR...</td>\n \
</tr>\n \
<tr>\n \
<td>5th</td>\n \
<td colspan=\"4\">1/2 or lower</td>\n \
</tr>\n \
<tr>\n \
<td>8th</td>\n \
<td colspan=\"4\">1 or lower</td>\n \
</tr>\n \
<tr>\n \
<td>11th</td>\n \
<td colspan=\"4\">2 or lower</td>\n \
</tr>\n \
<tr>\n \
<td>14th</td>\n \
<td colspan=\"4\">3 or lower</td>\n \
</tr>\n \
<tr>\n \
<td>17th</td>\n \
<td colspan=\"4\">4 or lower</td>\n \
</tr>\n \
</table>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Arcane Abjuration</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Arcana Domain</specialization>\n";

addClericCharmAnimals = " \
<actions>\n \
<id-00001>\n \
<label type=\"string\">Charmed</label>\n \
<order type=\"number\">1</order>\n \
<type type=\"string\">effect</type>\n \
</id-00001>\n \
<id-00002>\n \
<atkmod type=\"number\">0</atkmod>\n \
<atkprof type=\"number\">1</atkprof>\n \
<order type=\"number\">2</order>\n \
<savedcmod type=\"number\">0</savedcmod>\n \
<savedcprof type=\"number\">1</savedcprof>\n \
<savetype type=\"string\">wisdom</savetype>\n \
<type type=\"string\">cast</type>\n \
</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Starting at 2nd level, you can use your Channel Divinity to charm animals and plants.</p>\n \
<p>As an action, you present your holy symbol and invoke the name of your deity. Each beast or plant creature that can see you within 30 feet of you must make a Wisdom saying throw. If the creature fails its saving throw, it is charmed by you for 1 minute or until it takes damage. While it is charmed by you, it is friendly to you and other creatures you designate,</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Channel Divinity: Charm Animals And Plants</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Nature Domain</specialization>\n";

addClericPreserveLife = " \
<actions>\n \
<id-00001>\n \
<heallist>\n \
<id-00001>\n \
<bonus type=\"number\">5</bonus>\n \
<dice type=\"dice\"></dice>\n \
</id-00001>\n \
</heallist>\n \
<order type=\"number\">1</order>\n \
<type type=\"string\">heal</type>\n \
</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
<p>Starting at 2nd level, you can use your Channel Divinity to heal the badly injured.</p>\n \
<p>As an action, you present your holy symbol and evoke healing energy that can restore a number of hit points equal to five times your cleric level. Choose any creatures within 30 feet of you, and divide those hit points among them. This feature can restore a creature to no more than half of its hit point maximum. You can't use this feature on an undead or a construct.</p>\n \
</description>\n \
\t\t\t\t<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Preserve Life</name>\n \
<prepared type=\"number\">20</prepared>\n \
<specialization type=\"string\">Life Domain</specialization>\n";

var multiWarn = (function () {
    //Creating the demo window
    function _createWindow() {
        var jqxWidget = $('#multiClassWarn');
        var offset = jqxWidget.offset();
        $('#MCwindow').jqxWindow({
            position: { x: 50, y: 50} ,
            theme: 'darkblue',
            isModal: true,
            showCollapseButton: true, maxHeight: 400, maxWidth: 700, minHeight: 200, minWidth: 200, height: 300, width: 500,
            initContent: function () {
                $('#MCwindow').jqxWindow('focus');
            }
        });
    }
    return {
        config: {
            dragArea: null
        },
        init: function () {
            _createWindow();
        }
    };
} ());

var dispLinks = (function () {
    function _createLinks() {
        var userLinks = $('#displayLinks');
        var offset = userLinks.offset();
        $('#Linkwindow').jqxWindow({
            position: { x: 150, y: 150} ,
            theme: 'darkblue',
            isModal: true,
            showCollapseButton: true, maxHeight: 400, maxWidth: 700, minHeight: 200, minWidth: 200, height: 300, width: 500,
            initContent: function () {
                $('#Linkwindow').jqxWindow('focus');
            }
        });
    }
    return {
        config: {
            dragArea: null
        },
        init: function () {
            _createLinks();
        }
    };
} ());

var clLinks = (function () {
    function _createCL() {
        var userCL = $('#displayCL');
        var offset = userCL.offset();
        $('#CLwindow').jqxWindow({
            position: { x: 150, y: 50},
            theme: 'darkblue',
            showCollapseButton: true,
            maxWidth: 700, 
            minWidth: 200, 
            height: 450, 
            width: 500, 
            resizable: true,
            isModal: true,
            initContent: function () {
                $('#CLwindow').jqxWindow('focus');
            }
        });
    }
    return {
        config: {
            dragArea: null
        },
        init: function () {
            _createCL();
        }
    };
} ());

var donateFGC = (function () {
    function _createDon() {
        var userDon = $('#displayDon');
        var offset = userDon.offset();
        $('#DONwindow').jqxWindow({
            position: { x: 150, y: 150} ,
            theme: 'darkblue',
            isModal: true,
            showCollapseButton: true, maxHeight: 400, maxWidth: 700, minHeight: 200, minWidth: 200, height: 300, width: 500, 
            initContent: function () {
                $('#DONwindow').jqxWindow('focus');
            }
        });
    }
    return {
        config: {
            dragArea: null
        },
        init: function () {
            _createDon();
        }
    };
} ());


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * *
Completed:
Tiefling
    Hellish Resistance













* * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
