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

payFlag = 1;

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
    "ReallyBasic(7748765)",
    "ElfRanger16(2343099)",
    "GnomeRogue16(2364733)",
    "TabaxiBarbarian10(2623686)",
    "AasimarCleric16(7782019)",
    "Sorcerer15(7413127)"
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
    // COMMENT OUT THE FOLLOWING LINE WHEN PUSHING TO PRODUCTION
    $("#popCharID").jqxDropDownList({ source: source, placeHolder: "Select Item", width: 250, height: 35, theme: "darkblue"});
    // COMMENT OUT THE ABOVE LINE WHEN PUSHING TO PRODUCTION
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

            // Get bonus for weapon, but this is only for Inventory, need to fix attacks
            for(d = 0; d <= item.definition.grantedModifiers.length - 1; d++) {
                if (item.definition.grantedModifiers[d].type == "bonus" && item.equipped == true) {
                    if (item.isAttuned == true && item.definition.canAttune == true) {
                        buildXML += "\t\t\t\t<bonus type=\"number\">" + item.definition.grantedModifiers[0].value + "</bonus>\n";
                    } else if (item.definition.canAttune == false) {
                        buildXML += "\t\t\t\t<bonus type=\"number\">" + item.definition.grantedModifiers[0].value + "</bonus>\n";
                    }
                }
            }

            weaponID.push(i + 1);
            weaponName.push(item.definition.name);
            weaponProperties.push(thisProperties);

            curWeapBon = 0;

            if (item.hasOwnProperty("canAttune")) {
                if (item.isAttuned == true && item.definition.canAttune == true) {
                    //buildXML += "\t\t\t\t<bonus type=\"number\">" + item.definition.grantedModifiers[0].value + "</bonus>\n";
                    //weaponBonus.push(item.definition.grantedModifiers[d].value);
                    for(d = 0; d <= item.definition.grantedModifiers.length - 1; d++) {
                        curWeapBon = item.definition.grantedModifiers[d].value;
                    }
                }
            } else {
                for(e = 0; e <= item.definition.grantedModifiers.length - 1; e++) {
                    curWeapBon = item.definition.grantedModifiers[e].value;
                }
            }
            weaponBonus.push(curWeapBon);

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
                // This item has weapon properties, but the length is 0
                //console.log(item.definition.name);
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
        buildXML += "\t\t\t\t<attackbonus type=\"number\">" + weaponBonus[x] + "</attackbonus>\n";
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
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "\nHair: " + fixQuote(character.hair) + "</appearance>\n";
    } else if (hasAppear == 4) {
        buildXML += "\t\t<appearance type=\"string\">Skin: " + fixQuote(character.skin) + "</appearance>\n";
    } else if (hasAppear == 5) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "\nSkin: " + fixQuote(character.skin) + "</appearance>\n";
    } else if (hasAppear == 6) {
        buildXML += "\t\t<appearance type=\"string\">Hair: " + fixQuote(character.hair) + "\nSkin: " + fixQuote(character.skin) + "</appearance>\n";
    } else if (hasAppear == 7) {
        buildXML += "\t\t<appearance type=\"string\">Eyes: " + fixQuote(character.eyes) + "\nHair: " + fixQuote(character.hair) + "\nSkin: " + fixQuote(character.skin) + "</appearance>\n";
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
            // Arcana, Death, Forge, Grave, Knowledge, Life, Light, Nature, Order, Tempest, Trickery, War
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

                } else if (clericDomain.match(/Life/)) {
                    thisIteration = pad(totalSpells + 1, 5);
                    totalSpells += 1;
                    buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                    buildXML += addClericPreserveLife;
                    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
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
            if (levelCleric >= 6) {
                if (clericDomain.match(/Arcana/)) {

                } else if (clericDomain.match(/Death/)) {

                } else if (clericDomain.match(/Forge/)) {

                } else if (clericDomain.match(/Grave/)) {

                } else if (clericDomain.match(/Knowledge/)) {

                } else if (clericDomain.match(/Life/)) {
                    thisIteration = pad(totalSpells + 1, 5);
                    totalSpells += 1;
                    buildXML += "\t\t\t<id-" + thisIteration + ">\n";
                    buildXML += addClericBlessedHealer;
                    buildXML += "\t\t\t</id-" + thisIteration + ">\n";
                } else if (clericDomain.match(/Light/)) {

                } else if (clericDomain.match(/Nature/)) {
                
                } else if (clericDomain.match(/Order/)) {

                } else if (clericDomain.match(/Tempest/)) {

                } else if (clericDomain.match(/Trickery/)) {

                } else if (clericDomain.match(/War/)) {

                } 
            }
            if (levelCleric >= 8) {
                if (clericDomain.match(/Arcana/)) {

                } else if (clericDomain.match(/Death/)) {

                } else if (clericDomain.match(/Forge/)) {

                } else if (clericDomain.match(/Grave/)) {

                } else if (clericDomain.match(/Knowledge/)) {

                } else if (clericDomain.match(/Life/)) {
                
                } else if (clericDomain.match(/Light/)) {

                } else if (clericDomain.match(/Nature/)) {
                
                } else if (clericDomain.match(/Order/)) {

                } else if (clericDomain.match(/Tempest/)) {

                } else if (clericDomain.match(/Trickery/)) {

                } else if (clericDomain.match(/War/)) {

                } 
            }
            if (levelCleric >= 17) {
                if (clericDomain.match(/Arcana/)) {

                } else if (clericDomain.match(/Death/)) {

                } else if (clericDomain.match(/Forge/)) {

                } else if (clericDomain.match(/Grave/)) {

                } else if (clericDomain.match(/Knowledge/)) {

                } else if (clericDomain.match(/Life/)) {
                    
                } else if (clericDomain.match(/Light/)) {

                } else if (clericDomain.match(/Nature/)) {
                
                } else if (clericDomain.match(/Order/)) {

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

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Start of Barbarian effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

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
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">Rage Wolf; ADVATK: melee</label>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 3rd level, when you adopt this path, you choose a totem spirit and gain its feature. You must make or acquire a physical totem object- an amulet or similar adornment-that incorporates fur or feathers, claws, teeth, or bones of the totem animal. At your option, you also gain minor physical attributes that are reminiscent of your totem spirit. For example, if you have a bear totem spirit, you might be unusually hairy and thick&#62;skinned, or if your totem is the eagle, your eyes turn bright yellow.</p>\n \
\t<p>Your totem animal might be an animal related to those listed here but more appropriate to your homeland. For example, you could choose a hawk or vulture in place of an eagle.</p>\n \
\t<p><b>Bear. </b>While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment.</p>\n \
\t<p><b>Eagle. </b>While you're raging and aren't wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease.</p>\n \
\t<p><b>Wolf. </b>While you're raging, your friends have advantage on melee attack rolls against any hostile creature within 5 feet of you. The spirit of the wolf makes you a leader of hunters.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Totem Spirit (Wolf)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Path of the Totem Warrior</specialization>\n";

addBarbarianEagleTotemSpirit = " \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">Rage Eagle; ADVCHK: strength; ADVSAV: strength; DMG: 4, melee; GRANTDISATK: opportunity; RESIST: bludgeoning, piercing, slashing</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 3rd level, when you adopt this path, you choose a totem spirit and gain its feature. You must make or acquire a physical totem object- an amulet or similar adornment-that incorporates fur or feathers, claws, teeth, or bones of the totem animal. At your option, you also gain minor physical attributes that are reminiscent of your totem spirit. For example, if you have a bear totem spirit, you might be unusually hairy and thick&#62;skinned, or if your totem is the eagle, your eyes turn bright yellow.</p>\n \
\t<p>Your totem animal might be an animal related to those listed here but more appropriate to your homeland. For example, you could choose a hawk or vulture in place of an eagle.</p>\n \
\t<p><b>Bear. </b>While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment.</p>\n \
\t<p><b>Eagle. </b>While you're raging and aren't wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease.</p>\n \
\t<p><b>Wolf. </b>While you're raging, your friends have advantage on melee attack rolls against any hostile creature within 5 feet of you. The spirit of the wolf makes you a leader of hunters.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Totem Spirit (Eagle)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Path of the Totem Warrior</specialization>\n";

addBarbarianBearTotemSpirit = " \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">Rage Bear; ADVCHK: strength; ADVSAV: strength; DMG: 4, melee; RESIST: all, !psychic</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 3rd level, when you adopt this path, you choose a totem spirit and gain its feature. You must make or acquire a physical totem object- an amulet or similar adornment-that incorporates fur or feathers, claws, teeth, or bones of the totem animal. At your option, you also gain minor physical attributes that are reminiscent of your totem spirit. For example, if you have a bear totem spirit, you might be unusually hairy and thick&#62;skinned, or if your totem is the eagle, your eyes turn bright yellow.</p>\n \
\t<p>Your totem animal might be an animal related to those listed here but more appropriate to your homeland. For example, you could choose a hawk or vulture in place of an eagle.</p>\n \
\t<p><b>Bear. </b>While raging, you have resistance to all damage except psychic damage. The spirit of the bear makes you tough enough to stand up to any punishment.</p>\n \
\t<p><b>Eagle. </b>While you're raging and aren't wearing heavy armor, other creatures have disadvantage on opportunity attack rolls against you, and you can the Dash action as a bonus action on your turn. The spirit of the eagle makes you into a predator who can weave through the fray with ease.</p>\n \
\t<p><b>Wolf. </b>While you're raging, your friends have advantage on melee attack rolls against any hostile creature within 5 feet of you. The spirit of the wolf makes you a leader of hunters.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Intimidating Presence</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Path of the Berserker</specialization>\n";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

End of Barbarian effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Start of Bard effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
<source type=\"string\">Bard</source>\n";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

End of Bard effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Start of Cleric effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
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
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Preserve Life</name>\n \
<prepared type=\"number\">20</prepared>\n \
<specialization type=\"string\">Life Domain</specialization>\n";


addClericBlessedHealer=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">3</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<healtargeting type=\"string\">self</healtargeting>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">4</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<healtargeting type=\"string\">self</healtargeting>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
\t<description type=\"formattedtext\">\n \
\t\t<p>Beginning at 6th level, the healing spells you cast on others heal you as well. When you cast a spell of 1st level or higher that restores hit points to a creature other than you, you regain hit points equal to 2 + the spell's level.</p>\n \
\t</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Blessed Healer</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Life Domain</specialization>\n";

addClericCureWoundsSupreme=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">8</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">wisdom</stat>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<castingtime type=\"string\">1 action</castingtime>\n \
<components type=\"string\">V, S</components>\n \
<description type=\"formattedtext\">\n \
\t<p>A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.</p>\n \
\t<p><b>At Higher Levels. </b>When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.</p>\n \
</description>\n \
<duration type=\"string\">Instantaneous</duration>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">1</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Cure Wounds (Supreme Heal)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<range type=\"string\">Touch</range>\n \
<school type=\"string\">Evocation</school>\n \
<source type=\"string\">Bard, Cleric, Cleric Life Domain, Druid, Paladin, Ranger</source>\n";

addClericCureWoundsLife=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">3</bonus>\n \
\t\t\t\t<dice type=\"dice\">d8</dice>\n \
\t\t\t\t<stat type=\"string\">base</stat>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<castingtime type=\"string\">1 action</castingtime>\n \
<components type=\"string\">V, S</components>\n \
<description type=\"formattedtext\">\n \
\t<p>A creature you touch regains a number of hit points equal to 1d8 + your spellcasting ability modifier. This spell has no effect on undead or constructs.</p>\n \
\t<p><b>At Higher Levels. </b>When you cast this spell using a spell slot of 2nd level or higher, the healing increases by 1d8 for each slot level above 1st.</p>\n \
</description>\n \
<duration type=\"string\">Instantaneous</duration>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">1</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Cure Wounds (Disciple of Life)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<range type=\"string\">Touch</range>\n \
<school type=\"string\">Evocation</school>\n \
<source type=\"string\">Bard, Cleric, Cleric Life Domain, Druid, Paladin, Ranger</source>\n";

addClericWardingFlare=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">DISATK:</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Also at 1st level, you can interpose divine light between yourself and an attacking enemy. When you are attacked a creature within 30 feet of you that you can see, you can use your reaction to impose disadvantage on the attack roll, causing light to flare before the attacker before it hits or misses. An attacker that can't be blinded is immune to this feature.</p>\n \
\t<p>You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Warding Flare</name>\n \
<prepared type=\"number\">1</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Light Domain</specialization>\n";

addClericRadianceOfDawn=" \
<actions>\n \
\t<id-00001>\n \
\t\t<onmissdamage type=\"string\">half</onmissdamage>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savetype type=\"string\">constitution</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<damagelist>\n \
\t\t<id-00001>\n \
\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t<dice type=\"dice\">d10,d10</dice>\n \
\t\t\t<stat type=\"string\">cleric</stat>\n \
\t\t\t<type type=\"string\">radiant</type>\n \
\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 2nd level, you can use your Channel Divinity so harness sunlight, banishing darkness and dealing additional damage to your foes.</p>\n \
\t<p>As an action, you present your holy symbol, and any magical darkness within 30 feet of you is dispelled. Additionally each hostile creature within 30 feet of you must make a Constitution saving throw. A creature takes radiant damage equal to 2d10 + your cleric level on a failed saving throw, and half as much damage on a successful one. A creature that has total cover from you is not affected.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Channel Divinity: Radiance of the Dawn</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Light Domain</specialization>\n";

addClericCoronaOfLight=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">DISSAV: dexterity</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 17th level, you can use your action to activate in aura of sunlight that lasts for 1 minute or until you dismiss it using another action. You emit bright light in a 60-foot radius and dim light 30 feet beyond that. Your enemies in the bright light have disadvantage on saving throws against any spell that deals fire or radiant magic.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Corona of Light</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Light Domain</specialization>\n";

addClericCharmAnimAndPlant=" \
<actions>\n \
\t<id-00001>\n \
\t\t<label type=\"string\">Charmed</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 2nd level, you can use your Channel Divinity to charm animals and plants.</p>\n \
\t<p>As an action, you present your holy symbol and invoke the name of your deity. Each beast or plant creature that can see you within 30 feet of you must make a Wisdom saying throw. If the creature fails its saving throw, it is charmed by you for 1 minute or until it takes damage. While it is charmed by you, it is friendly to you and other creatures you designate,</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Channel Divinity: Charm Animals And Plants</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Nature Domain</specialization>\n";

addClericDampenElements=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">roll</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">RESIST: acid,cold,fire,lightning,thunder</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 6th level, when you or a creature within 30 feet of you takes acid, cold, fire, lightning, or thunder damage, you can use your reaction to grant resistance to the creature against that instance of the damage.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Dampen Elements</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Nature Domain</specialization>\n";

addClericDivineStrike=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">roll</apply>\n \
\t\t<label type=\"string\">DMG: 1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 8th level, you gain the ability to infuse your weapon strikes with divine energy. Once on each of your turns when you hit a creature with a weapon attack, you can cause the attack- to deal an extra 1d8 damage of the same type dealt by the weapon to the target. When you reach 14th level, the extra damage increases to 2d8.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Divine Strike</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">War Domain</specialization>\n";

addClericWrathOfTheStorm=" \
<actions>\n \
\t<id-00001>\n \
\t\t<onmissdamage type=\"string\">half</onmissdamage>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savetype type=\"string\">dexterity</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d8,d8</dice>\n \
\t\t\t\t<type type=\"string\">lightning</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d8,d8</dice>\n \
\t\t\t\t<type type=\"string\">thunder</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Also at 1st level, you can thunderously rebuke attackers. When a creature within 5 feet of you that you can see hits you with an attack. you can use your reaction to cause the creature to make a Dexterity saving throw. The creature takes 2d8 lightning or thunder damage (your choice) on a failed saving throw, and half as much damage on a successful one.</p>\n \
\t<p>You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Wrath of the Storm</name>\n \
<prepared type=\"number\">1</prepared>\n \
<specialization type=\"string\">Tempest Domain</specialization>\n";

addClericBlessingOfTheTrickster=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">hour</durunit>\n \
\t\t<label type=\"string\">ADVSKILL:stealth</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting when you choose this domain at 1st level, you can use your action to touch a willing creature other than yourself to give it advantage on Dexterity (Stealth) checks. This blessing lasts for 1 hour or until you use this feature again.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Blessing of the Trickster</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Trickery Domain</specialization>\n";

addClericCloakOfShadows=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Invisible</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 6th level, you can use your Channel Divinity to vanish.</p>\n \
\t<p>As an action, you become invisible until the end of your next turn. You become visible if you attack or cast a spell.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Channel Divinity: Cloak of Shadows</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Trickery Domain</specialization>\n";

addClericWarPriest=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>From 1st level, your god delivers bolts of inspiration to you while you are engaged in battle. When you use the Attack action, you can make one weapon attack as a bonus action.</p>\n \
\t<p>You can use this feature a number of times equal to your Wisdom modifier (a minimum of once). You regain all expended uses when you finish a long rest.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">War Priest</name>\n \
<prepared type=\"number\">1</prepared>\n \
<specialization type=\"string\">War Domain</specialization>\n";

addClericAvatarOfBattle=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">RESIST:bludgeoning,piercing,slashing,!magic</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 17th level, you gain resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Avatar of Battle</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">War Domain</specialization>\n";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

End of Cleric effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Start of Druid effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

addDruidLandStride=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Land's Stride; ADVSAV:all</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 6th level, moving through nonmagical difficult terrain costs you no extra movement. You can also pass through nonmagical plants without being slowed by them and without taking damage from them if they have thorns, spines, or a similar hazard.</p>\n \
\t<p>In addition, you have advantage on saving throws against plants that are magically created or manipulated to impede movement, such those created by the entangle spell.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Land's Stride</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Druid</source>\n \
<specialization type=\"string\">Circle of the Land</specialization>\n";

addDruidNaturalRecovery=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 2nd level, you can regain some of your magical energy by sitting in meditation and communing with nature. Once per day during a short rest, you choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your druid level (rounded up), and none of the slots can be 6th level or higher.</p>\n \
\t<p>For example, when you area 4th-level druid, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Natural Recovery</name>\n \
<prepared type=\"number\">1</prepared>\n \
<source type=\"string\">Druid</source>\n \
<specialization type=\"string\">Circle of the Land</specialization>\n \
<usesperiod type=\"string\">enc</usesperiod>\n";

addDruidCircleOfLand=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 2nd level, you can regain some of your magical energy by sitting in meditation and communing with nature. Once per day during a short rest, you choose expended spell slots to recover. The spell slots can have a combined level that is equal to or less than half your druid level (rounded up), and none of the slots can be 6th level or higher.</p>\n \
\t<p>For example, when you area 4th-level druid, you can recover up to two levels worth of spell slots. You can recover either a 2nd-level spell slot or two 1st-level spell slots.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Natural Recovery</name>\n \
<prepared type=\"number\">1</prepared>\n \
<source type=\"string\">Druid</source>\n \
<specialization type=\"string\">Circle of the Land</specialization>\n \
<usesperiod type=\"string\">enc</usesperiod>\n";

addDruidNaturesSanctuary=" \
<actions>\n \
\t<id-00001>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>When you reach 14th level, creatures of the natural world sense your connection to nature and become hesitant to attack you. When a beast or plant creature attacks you, that creature must make a Wisdom saving throw against your druid spell save DC. On a failed save, the creature must choose a different target, or the attack automatically misses. On a successful save, the creature is immune to this effect for 24 hours.</p>\n \
\t<p>The creature is aware of this effect before it makes its attack against you.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Nature's Sanctuary</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Druid</source>\n \
<specialization type=\"string\">Circle of the Land</specialization>\n";

addDruidWildShape=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 2nd level, you can use your action to magically assume the shape of a beast. You can use this feature twice, and you regain expended uses when you finish a short or long rest.</p>\n \
\t<p>Your druid level determines the beasts you can transform into, as shown in the Beast Shapes table. At 2nd level, for example, you can transform into any beast that has a Challenge Rating of 1/4 or lower that doesn't have a fly or swim speed.</p>\n \
\t<p><b>Beast Shapes</b></p>\n \
\t<table>\n \
\t\t<tr>\n \
\t\t\t<td><b>Level</b></td>\n \
\t\t\t<td><b>Max. CR</b></td>\n \
\t\t\t<td><b>Limitations</b></td>\n \
\t\t\t<td><b>Example</b></td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td>2nd</td>\n \
\t\t\t<td>1/4</td>\n \
\t\t\t<td>No flying or swimming speed</td>\n \
\t\t\t<td>Wolf</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td>4th</td>\n \
\t\t\t<td>1/2</td>\n \
\t\t\t<td>No fying speed</td>\n \
\t\t\t<td>Crocodile</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td>8th</td>\n \
\t\t\t<td>1</td>\n \
\t\t\t<td>-</td>\n \
\t\t\t<td>Giant eagle</td>\n \
\t\t</tr>\n \
\t</table>\n \
\t<p>You can stay in a beast shape for a number of hours equal to half your druid level (rounded down). You then revert to your normal form unless you expend another use of this feature.</p>\n \
\t<p>You can revert to your normal form earlier by using a bonus action on your turn. You automatically revert to your normal form if you fall unconscious, drop to 0 hit points, or die.</p>\n \
\t<p>While you are transformed, the following rules apply:</p>\n \
\t<list>\n \
\t\t<li>Your game statistics are replaced by the statistics of the beast, but you retain your alignment and your Intelligence, Wisdom, and Charisma scores. You also retain all of your skill and saving throw proficiencies, in addition to gaining those of the creature. If both you and the creature have the same proficiency, use only the higher bonus.</li>\n \
\t\t<li>When you transform, you assume the beast's hit points. When you revert to your normal form, you return to the number of hit points you had before you transformed. If you revert as a result of dropping to 0 hit points, however, any excess damage carries over to your normal form. For example, if you take 10 damage in animal form and have only 1 hit point left, you revert to your normal form and take 9 damage.</li>\n \
\t\t<li>You can't cast spells, speak, or take any action that requires hands. Transforming doesn't break your concentration on a spell you've already cast, however, or prevent you from taking actions that are part of a spell you've already cast, such as call lightning.</li>\n \
\t\t<li>You retain the benefit of any feature from your class, race, or other source and can use them if the new form is physically capable of doing so. However, you can't use any of your special senses, such as darkvision, unless your new form also has that sense.</li>\n \
\t\t<li>You choose whether your equipment falls to the ground in your space, merges into your new form, or is worn by it. Worn equipment functions as normal, but the DM decides whether it is practical for the new form to wear a piece of equioment, based on the creature's shape or size. Your equipment doesn't change size or shape to match the new form, and any equipment that the new form can't wear must either fall to the ground or merge with it. Equipment that merges with the form has no effect until you leave the form.</li>\n \
\t</list>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Wild Shape</name>\n \
<prepared type=\"number\">2</prepared>\n \
<source type=\"string\">Druid</source>\n \
<usesperiod type=\"string\">enc</usesperiod>\n";

addDruidNaturesWard=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">IMMUNE:poison; IMMUNE:poisoned; IFT:TYPE(elemental,fey);IMMUNE:charmed;IMMUNE:frightened</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00003>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Nature's Ward;IMMUNE: disease</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>When you reach 10th level, you can't be charmed or frightened by elementals or fey, and you are immune to poison and disease.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Nature's Ward</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Circle of the Land</specialization>\n";

addDruidCombatWildShape=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d8</dice>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<healtargeting type=\"string\">self</healtargeting>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d8,d8</dice>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<healtargeting type=\"string\">self</healtargeting>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>When you choose this circle at 2nd level, you gain the ability to use Wild Shape on your turn as a bonus action, rather than as an action.</p>\n \
\t<p>Additionally, while you are transformed by Wild Shape, you can use a bonus action to expend one spell slot to regain 1d8 hit points per level of the spell slot expended.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Combat Wild Shape</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Circle of the Moon</specialization>\n \
<usesperiod type=\"string\">enc</usesperiod>\n";

addDruidPrimalStrike=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">DMGTYPE:magic</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 6th level, your attacks in beast form count as being magical for the purpose of overcoming resistance and immunity to nonmagical attacks and damage.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Primal Strike</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Circle of the Moon</specialization>\n";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

End of Druid effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Start of Fighter effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

addFighterActionSurge=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 2nd level, you can push yourself beyond your normal limits for a moment. On your turn, you can take one additional action on top of your regular action and a possible bonus action.</p>\n \
\t<p>Once you use this feature, you must finish a short or long rest before you can use it again. Starting at 17th level, you can use it twice before a rest, but only once on the same turn.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Action Surge</name>\n \
<prepared type=\"number\">2</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Fighter</source>\n \
<usesperiod type=\"string\">enc</usesperiod>\n";

addFighterIndomitable=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Beginning at 9th level, you can reroll a saving throw that you fail. If you do so, you must use the new roll, and you can't use this feature again until you finish a long rest.</p>\n \
\t<p>You can use this feature twice between long rests starting at 13th level and three times between long rests starting at 17th level.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Indomitable</name>\n \
<prepared type=\"number\">4</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Fighter</source>\n";

addFighterSecondWind=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d10</dice>\n \
\t\t\t\t<stat type=\"string\">fighter</stat>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<healtargeting type=\"string\">self</healtargeting>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>You have a limited well of stamina that you can draw on to protect yourself from harm. On your turn, you can use a bonus action to regain hit points equal to 1d10 + your fighter level.</p>\n \
\t<p>Once you use this feature, you must finish a short or long rest before you can use it again.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Second Wind</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Fighter</source>\n \
<usesperiod type=\"string\">enc</usesperiod>\n";

addFighterRallyingCry=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">fighter</stat>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>When you choose this archetype at 3rd level, you learn how to inspire your allies to fight on past their injuries.</p>\n \
\t<p>When you use your Second Wind feature, you can choose up to three creatures within 60 feet of you that are allied with you. Each one regains hit points equal to your fighter level, provided that the creature can see or hear you.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Rallying Cry</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Purple Dragon Knight</specialization>\n \
<usesperiod type=\"string\">enc</usesperiod>\n";

addFighterRoyalEnvoy=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">SKILL:[PRF], persuasion</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>A Purple Dragon knight serves as an envoy of the Cormyrean crown. Knights of high standing are expected to conduct themselves with grace.</p>\n \
\t<p>At 7th level, you gain proficiency in the Persuasion skill. If you are already proficient in it, you gain proficiency in one of the following skills of your choice: Animal Handling, Insight, Intimidation, or Performance.</p>\n \
\t<p>Your proficiency bonus is doubled for any ability check you make that uses Persuasion. You receive this benefit regardless of the skill proficiency you gain from this feature.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Royal Envoy</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Purple Dragon Knight</specialization>\n";

addFighterRemarkableAthlete=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">CHECK:[HPRF], strength; CHECK:[HPRF],dexterity; CHECK:[HPRF],constitution</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">INIT:[HPRF]</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 7th level, you can add half your proficiency bonus (round up) to any Strength, Dexterity, or Constitution check you make that doesn't already use your proficiency bonus.</p>\n \
\t<p>In addition, when you make a running long jump, the distance you can cover increases by a number of feet equal to your Strength modifier.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Remarkable Athlete</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Champion</specialization>\n";

addFighterSurvivor=" \
<actions>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">IF:Bloodied; REGEN:5 [CON]</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 18th level, you attain the pinnacle of resilience in battle. At the start of each of your turns, you regain hit points equal to 5 + your Constitution modifier if you have no more than half of your hit points left. You don't gain this benefit if you have 0 hit points.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Survivor</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Champion</specialization>\n";

addFighterCombatSuperiority=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>When you choose this archetype at 3rd level, you learn maneuvers that are fueled by special dice called superiority dice.</p>\n \
\t<p><b>Maneuvers. </b>You learn three maneuvers of your choice, which are detailed under &#34;Maneuvers&#34; below. Many maneuvers enhance an attack in some way. You can use only one maneuver per attack.</p>\n \
\t<p>You learn two additional maneuvers of your choice at 7th, 10th, and 15th level. Each time you learn new maneuvers, you can also replace one maneuver you know with a different one.</p>\n \
\t<p><b>Maneuvers</b></p>\n \
\t<p>The maneuvers are presented in alphabetical order.</p>\n \
\t<table>\n \
\t\t<tr>\n \
\t\t\t<td><b>Maneuver</b></td>\n \
\t\t\t<td colspan=\"3\"><b>Description</b></td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Commander's Strike</b></td>\n \
\t\t\t<td colspan=\"3\">When you take the Attack action on your turn, you can forgo one of your attacks and use a bonus action to direct one of your companions to strike. When you do so, choose a friendly creature who can see or hear you and expend one superiority die. That creature can immediately use its reaction to make one weapon attack, adding the superiority die to the attack's damage roll.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Disarming Attack</b></td>\n \
\t\t\t<td colspan=\"3\">When you hit a creature with a weapon attack, you can expend one superiority die to attempt to disarm the target, forcing it to drop one item of your choice that it's holding. You add the superiority die to the attack's damage roll, and the target must make a Strength saving throw. On a failed save, it drops the object you choose. The object lands at its feet.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Distracting Strike</b></td>\n \
\t\t\t<td colspan=\"3\">When you hit a creature with a weapon attack, you can expend one superiority die to distract the creature, giving your allies an opening. You add the superiority die to the attack's damage roll. The next attack roll against the target by an attacker other than you has advantage if the attack is made before the start of your next turn.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Evasive Footwork</b></td>\n \
\t\t\t<td colspan=\"3\">When you move, you can expend one superiority die, rolling the die and adding the number rolled to your AC until you stop moving.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Feinting Attack.</b></td>\n \
\t\t\t<td colspan=\"3\">You can expend one superiority die and use a bonus action on your turn to feint, choosing one creature within 5 feet of you as your target. You have advantage on your next attack roll against that creature. If that attack hits, add the superiority die to the attack's damage roll. The advantage is lost if not used on the turn you gain it.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Goading Attack</b></td>\n \
\t\t\t<td colspan=\"3\">When you hit a creature with a weapon attack, you can expend one superiority die to attempt to goad the target into attacking you. You add the superiority die to the attack's damage roll, and the target must make a Wisdom saving throw. On a failed save, the target has disadvantage on all attack rolls against targets other than you until the end of your next turn.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Lunging Attack</b></td>\n \
\t\t\t<td colspan=\"3\">When you make a melee weapon attack on your turn, you can expend one superiority die to increase your reach for that attack by 5 feet. If you hit, you add the superiority die to the attack's damage roll.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Maneuvering Attack</b></td>\n \
\t\t\t<td colspan=\"3\">When you hit a creature with a weapon attack, you can expend one superiority die to maneuver one of your comrades into a more advantageous position. You add the superiority die to the attack's damage roll, and you choose a friendly creature who can see or hear you. That creature can use its reaction to move up to half its speed without provoking opportunity attacks from the target of your attack.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Menacing Attack</b></td>\n \
\t\t\t<td colspan=\"3\">When you hit a creature with a weapon attack, you can expend one superiority die to attempt to frighten the target. You add the superiority die to the attack's damage roll, and the target must make a Wisdom saving throw. On a failed save, it is frightened of you until the end of your next turn.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Parry</b></td>\n \
\t\t\t<td colspan=\"3\">When another creature damages you with a melee attack, you can use your reaction and expend one superiority die to reduce the damage by the number you roll on your superiority die + your Dexterity modifier.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Precision Attack</b></td>\n \
\t\t\t<td colspan=\"3\">When you make a weapon attack roll against a creature, you can expend one superiority die to add it to the roll. You can use this maneuver before or after making the attack roll, but before any effects of the attack are applied.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Pushing Attack</b></td>\n \
\t\t\t<td colspan=\"3\">When you hit a creature with a weapon attack, you can expend one superiority die to attempt to drive the target back. You add the superiority die to the attack's damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you push the target up to 15 feet away from you.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Rally</b></td>\n \
\t\t\t<td colspan=\"3\">On your turn, you can use a bonus action and expend one superiority die to bolster the resolve of one of your companions. When you do so, choose a friendly creature who can see or hear you. That creature gains temporary hit points equal to the superiority die roll + your Charisma modifier.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Riposte</b></td>\n \
\t\t\t<td colspan=\"3\">When a creature misses you with a melee attack, you can use your reaction and expend one superiority die to make a melee weapon attack against the creature. If you hit, you add the superiority die to the attack's damage roll.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Sweeping Attack</b></td>\n \
\t\t\t<td colspan=\"3\">When you hit a creature with a melee weapon attack, you can expend one superiority die to attempt to damage another creature with the same attack. Choose another creature within 5 feet of the original target and within your reach. If the original attack roll would hit the second creature, it takes damage equal to the number you roll on your superiority die. The damage is of the same type dealt by the original attack.</td>\n \
\t\t</tr>\n \
\t\t<tr>\n \
\t\t\t<td><b>Trip Attack</b></td>\n \
\t\t\t<td colspan=\"3\">When you hit a creature with a weapon attack, you can expend one superiority die to attempt to knock the target down. You add the superiority die to the attack's damage roll, and if the target is Large or smaller, it must make a Strength saving throw. On a failed save, you knock the target prone.</td>\n \
\t\t</tr>\n \
\t</table>\n \
\t<p><b>Superiority Dice. </b>You have four superiority dice, which are d8s. A superiority die is expended when you use it. You regain all of your expended superiority dice when you finish a short or long rest.</p>\n \
\t<p>You gain another superiority die at 7th level and one more at 15th level.</p>\n \
\t<p><b>Saving Throws. </b>Some of your maneuvers require your target to make a saving throw to resist the maneuver's effects. The saving throw DC is calculated as follows:</p>\n \
\t<p><b>Maneuver save DC </b>= 8 + your proficiency bonus + your Strength or Dexterity modifier (your choice)</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Combat Superiority</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Battle Master</specialization>\n";

addFighterCommandersStrike=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">roll</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Commander's Strike;DMG: 1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Commander's Strike</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterDisarmingAttack=" \
<actions>\n \
\t<id-00002>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Disarming Strike; DMG: 1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">strength</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00003>\n \
\t<id-00004>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Disarming Strike - item dropped;</label>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00004>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Disarming Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterDistractingStrike=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Distracting Strike; DMG: 1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Distracting Strike; GRANTADVATK:</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Distracting Strike</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterReintingAttack=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">roll</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Feinting Attack; DMG: 1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Feinting Attack; ADVATK:</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Feinting Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterGoadingAttack=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Goading Attack; DMG: 1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00003>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00003>\n \
\t<id-00004>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Goaded; DISATK:</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00004>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Goading Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterLungingAttack=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Lunging Attack; DMG: 1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Lunging Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterManeuveringAttack=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Maneuvering Attack; DMG: 1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Maneuvering Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterMenacingAttack=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Menaced; frightened</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Menacing Attack; DMG: 1d8</label>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Menacing Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterPrecisionAttack=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Precision Attack; ATK:1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Precision Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterPushingAttack=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">strength</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Pushing Attack; DMG: 1d8</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Pushing Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterRally=" \
<actions>\n \
\t<id-00002>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d8</dice>\n \
\t\t\t\t<stat type=\"string\">charisma</stat>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<healtype type=\"string\">temp</healtype>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Rally</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterRiposte=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Riposte; DMG:1d8</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Riposte</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterSweepingAttack=" \
<actions>\n \
\t<id-00002>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d8</dice>\n \
\t\t\t\t<type type=\"string\">slashing</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d8</dice>\n \
\t\t\t\t<type type=\"string\">piercing, magic</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Sweeping Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterTripAttack=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">strength</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Trip Attack; prone</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Trip Attack; DMG:1d8</label>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Trip Attack</name>\n \
<prepared type=\"number\">0</prepared>\n";

addFighterEldritchStrike=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Eldritch Strike; DISSAV:all;</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 10th level, you learn how to make your weapon strikes undercut a creature's resistance to your spells. When you hit a creature with a weapon attack, that creature has disadvantage on the next saving throw it makes against a spell you cast before the end of your next turn.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Eldritch Strike</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Eldritch Knight</specialization>\n";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

End of Fighter effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Start of Monk effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

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


addMonkEmptyBody=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">Invisible</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">RESIST:all,!force</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Beginning at 18th level, you can use your action to spend 4 ki points to become invisible for 1 minute.</p>\n \
\t<p>During that time, you also have resistance to all damage but force damage. Additionally, you can spend 8 ki points to cast the astral projection spell, without needing material components. When you do so, you can't take any other creatures with you.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Empty Body</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Monk</source>\n";

addMonkEvasion=" \
<actions>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Evasion</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 7th level, your instinctive agility lets you dodge out of the way of certain area effects, such as a blue dragon's lightning breath or a fireball spell. When you are subjected to an effect that allows you to make a Dexterity saving throw to take only half damage, you instead take no damage if you succeed on the saving throw, and only half damage if you fail.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Evasion</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Monk</source>\n";

addMonkKi=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 2nd level, your training allows you to harness the mystic energy of ki. Your access to this energy is represented by a number of ki points. Your monk level determines the number of points you have, as shown in the Ki Points column of the Monk table. You can spend these points to fuel various ki features. You start knowing three such features: Flurry of Blows, Patient Defense, and Step of the Wind. You learn more ki features as you gain levels in this class. When you spend a ki point, it is unavailable until you finish a short or long rest, at the end of which you draw all of your expended ki back into yourself. You must spend at least 30 minutes of the rest meditating to regain your ki points.</p>\n \
\t<p>Some of your ki features require your target to make a saving throw to resist the feature's effects. The saving throw DC is calculated as follows:</p>\n \
\t<p><b>Ki save DC </b>= 8 + your proficiency bonus + your Wisdom modifier</p>\n \
\t<p><b>Flurry of Blows</b></p>\n \
\t<p>Immediately after you take the Attack action on your turn, you can spend 1 ki point to make two unarmed strikes as a bonus action.</p>\n \
\t<p><b>Patient Defense</b></p>\n \
\t<p>You can spend 1 ki point to take the Dodge action as a bonus action on your turn.</p>\n \
\t<p><b>Step of the Wind</b></p>\n \
\t<p>You can spend 1 ki point to take the Disengage or Dash action as a bonus action on your turn, and your jump distance is doubled for the turn.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Ki</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Monk</source>\n";

addMonkFlurryOfBlows=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">dexterity</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">prone</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">strength</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Flurry of Blows</name>\n \
<prepared type=\"number\">0</prepared>\n";

addMonkPatientDefense=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">dodge</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Patient Defense</name>\n \
<prepared type=\"number\">0</prepared>\n";

addMonkStepOfTheWind=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Step of the Wind</name>\n \
<prepared type=\"number\">0</prepared>\n";

addMonkPurityOfBody=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">IMMUNE: poison,poisoned</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Immunity to disease</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 10th level, your mastery of the ki flowing through you makes you immune to disease and poison.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Purity of Body</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Monk</source>\n";

addMonkSlowFall=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">level</stat>\n \
\t\t\t</id-00001>\n \
\t\t\t<id-00002>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">level</stat>\n \
\t\t\t</id-00002>\n \
\t\t\t<id-00003>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">level</stat>\n \
\t\t\t</id-00003>\n \
\t\t\t<id-00004>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">level</stat>\n \
\t\t\t</id-00004>\n \
\t\t\t<id-00005>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">level</stat>\n \
\t\t\t</id-00005>\n \
\t\t</heallist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Beginning at 4th level, you can use your reaction when you fall to reduce any falling damage you take by an amount equal to five times your monk level.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Slow Fall</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Monk</source>\n";

addMonkStunningStrike=" \
<actions>\n \
\t<id-00001>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savetype type=\"string\">constitution</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Stunned</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 5th level, you can interfere with the flow of ki in an opponent's body. When you hit another creature with a melee weapon attack, you can spend 1 ki point to attempt a stunning strike. The target must succeed on a Constitution saving throw or be stunned until the end of your next turn.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Stunning Strike</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Monk</source>\n";

addMonkWholenessOfBody=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">monk</stat>\n \
\t\t\t</id-00001>\n \
\t\t\t<id-00002>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">monk</stat>\n \
\t\t\t</id-00002>\n \
\t\t\t<id-00003>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">monk</stat>\n \
\t\t\t</id-00003>\n \
\t\t</heallist>\n \
\t\t<healtargeting type=\"string\">self</healtargeting>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 6th level, you gain the ability to heal yourself. As an action, you can regain hit points equal to three times your monk level. You must finish a long rest before you can use this feature again.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Wholeness of Body</name>\n \
<prepared type=\"number\">1</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Way of the Open Hand</specialization>\n";

addMonkTranquility=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcbase type=\"string\">ability</savedcbase>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savedcstat type=\"string\">wisdom</savedcstat>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Tranquility</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Beginning at 11th level, you can enter a special meditation that surrounds you with an aura of peace. At the end of a long rest, you gain the effect of a sanctuary spell that lasts until the start of your next long rest (the spell can end early as normal). The saving throw DC for the spell equals 8 + your Wisdom modifier + your proficiency bonus.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Tranquility</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Way of the Open Hand</specialization>\n";

addMonkShadowStep=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">ADVATK: melee</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 6th level, you gain the ability to step from one shadow into another. When you are in dim light or darkness, as a bonus action you can teleport up to 60 feet to an unoccupied space you can see that is also in dim light or darkness. You then have advantage on the first melee attack you make before the end of the turn.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Shadow Step</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Way of Shadow</specialization>\n";

addMonkCloakOfShadows=" \
<actions>\n \
\t<id-00001>\n \
\t\t<label type=\"string\">Invisible</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>By 11th level, you have learned to become one with the shadows. When you are in an area of dim light or darkness, you can use your action to become invisible. You remain invisible until you make an attack, cast a spell, or are in an area of bright light.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Cloak of Shadows</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Way of Shadow</specialization>\n";

addMonkFangsOfTheFireStrike=" \
<actions>\n \
\t<id-00001>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d10</dice>\n \
\t\t\t\t<type type=\"string\">fire</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Fangs of the Fire Strike</name>\n \
<prepared type=\"number\">0</prepared>\n";

addMonkFistOfUnbrokenAir=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<onmissdamage type=\"string\">half</onmissdamage>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">strength</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d10,d10,d10</dice>\n \
\t\t\t\t<type type=\"string\">bludgeoning</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d10,d10,d10,d10</dice>\n \
\t\t\t\t<type type=\"string\">bludgeoning</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00003>\n \
\t<id-00004>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">prone</label>\n \
\t\t<order type=\"number\">4</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00004>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Fist of Unbroken Air</name>\n \
<prepared type=\"number\">0</prepared>\n";

addMonkWaterWhip=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<onmissdamage type=\"string\">half</onmissdamage>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">dexterity</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d10,d10,d10</dice>\n \
\t\t\t\t<type type=\"string\">bludgeoning</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">prone</label>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Water Whip</name>\n \
<prepared type=\"number\">0</prepared>\n";

addMonkTouchOfDeath=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">wisdom</stat>\n \
\t\t\t</id-00001>\n \
\t\t\t<id-00002>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">monk</stat>\n \
\t\t\t</id-00002>\n \
\t\t</heallist>\n \
\t\t<healtargeting type=\"string\">self</healtargeting>\n \
\t\t<healtype type=\"string\">temp</healtype>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting when you choose this tradition at 3rd level, your study of death allows you to extract vitality from another creature as it nears its demise. When you reduce a creature within 5 feet of you to 0 hit points, you gain temporary hit points equal to your Wisdom modifier + your monk level (minimum of 1 temporary hit point).</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Touch of Death</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Way of the Long Death</specialization>\n";

addMonkHourOfReaping=" \
<actions>\n \
\t<id-00001>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<label type=\"string\">Frightened</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 6th level, you gain the ability to unsettle or terrify those around you as an action, for your soul has been touched by the shadow of death. When you take this action, each creature within 30 feet of you that can see you must succeed on a Wisdom saving throw or be frightened of you until the end of your next turn.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Hour of Reaping</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Way of the Long Death</specialization>\n";

addMonkTouchOfTheLongDeath=" \
<actions>\n \
\t<id-00001>\n \
\t\t<onmissdamage type=\"string\">half</onmissdamage>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savetype type=\"string\">constitution</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d10,d10</dice>\n \
\t\t\t\t<type type=\"string\">necrotic</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 17th level, your touch can channel the energy of death into a creature. As an action, you touch one creature within 5 feet of you, and you expend 1 to 10 ki points. The target must make a Constitution saving throw, and it takes 2d10 necrotic damage per ki point spent on a failed save, or half as much damage on a successful one.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Touch of the Long Death</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Way of the Long Death</specialization>\n";

addMonkRadiantSunBolt=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkbase type=\"string\">ability</atkbase>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<atkstat type=\"string\">dexterity</atkstat>\n \
\t\t<atktype type=\"string\">ranged</atktype>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d4</dice>\n \
\t\t\t\t<stat type=\"string\">dexterity</stat>\n \
\t\t\t\t<type type=\"string\">radiant</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<name type=\"string\">Radiant Sun Bolt</name>\n \
<prepared type=\"number\">0</prepared>\n";

addMonkSunShield=" \
<actions>\n \
\t<id-00001>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">5</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<stat type=\"string\">wisdom</stat>\n \
\t\t\t\t<type type=\"string\">radiant</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 17th level, you become wreathed in a luminous aura. You shed bright light in a 30-foot radius and dim light for an additional 30 feet. You can extinguish or restore the light as a bonus action.</p>\n \
\t<p>If a creature hits you with a melee attack while this light shines, you can use your reaction to deal radiant damage to the creature. The radiant damage equals 5 + your Wisdom modifier.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group>\n \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Sun Shield</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Way of the Sun Soul</specialization>\n";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

End of Monk effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

Start of Paladin effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */


addPaladinAuraOfCourage=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Aura of Courage; IMMUNE: frightened</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 10th level, you and friendly creatures within 10 feet of you can't be frightened while you are conscious.</p>\n \
\t<p>At 18th level, the range of this aura increases to 30 feet.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Aura of Courage</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Paladin</source>\n";

addPaladinAuraOfProtection=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Aura of Protection; SAVE: [CHA]</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 6th level, whenever you or a friendly creature within 10 feet of you must make a saving throw, the creature gains a bonus to the saving throw equal to your Charisma modifier (with a minimum bonus of +1). You must be conscious to grant this bonus.</p>\n \
\t<p>At 18th level, the range of this aura increases to 30 feet.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Aura of Protection</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Paladin</source>\n";

addPaladinDivineHealth=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Divine Health - immune to disease;</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>By 3rd level, the divine magic flowing through you makes you immune to disease.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Divine Health</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Paladin</source>\n";

addPaladinDivineSmite=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>The presence of strong evil registers on your senses like a noxious odor, and powerful good rings like heavenly music in your ears. As an action, you can open your awareness to detect such forces. Until the end of your next turn, you know the location of any celestial, fiend, or undead within 60 feet of you that is not behind total cover. You know the type (celestial, fiend, or undead) of any being whose presence you sense, but not its identity (the vampire Count Strahd von Zarovich, for instance).</p>\n \
\t<p>Within the same radius, you also detect the presence of any place or object that has been consecrated or desecrated, as with the hallow spell.</p>\n \
\t<p>You can use this feature a number of times equal to 1 + your Charisma modifier. When you finish a long rest, you regain all expended uses.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Divine Sense</name>\n \
<prepared type=\"number\">2</prepared>\n \
<source type=\"string\">Paladin</source>\n";

addPaladinDivingSmite=" \
<actions>\n \
\t<id-00003>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">DMG: 2d8 radiant; IFT: TYPE(fiend,undead);DMG:1d8 radiant</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00003>\n \
\t<id-00004>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">DMG: 3d8 radiant; IFT: TYPE(fiend,undead);DMG:1d8 radiant</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00004>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 2nd level, when you hit a creature with a melee weapon attack, you can expend one spell slot to deal radiant damage to the target, in addition to the weapon's damage. The extra damage is 2d8 for a 1st-level spell slot, plus 1d8 for each spell level higher than 1st, to a maximum of 5d8. The damage increases by 1d8 if the target is an undead or a fiend.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Divine Smite</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Paladin</source>\n";

addPaladinExaltedChampion=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">hour</durunit>\n \
\t\t<label type=\"string\">RESIST:bludgeoning,piercing,slashing,!magic;ADVSAV: wisdom; ADVDEATH</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 20th level, your presence on the field of battle is an inspiration to those dedicated to your cause. You can use your action to gain the following benefits for 1 hour:</p>\n \
\t<list>\n \
\t\t<li>You have resistance to bludgeoning, piercing, and slashing damage from nonmagical weapons.</li>\n \
\t\t<li>Your allies have advantage on death saving throws while within 30 feet of you.</li>\n \
\t\t<li>You have advantage on Wisdom saving throws, as do your allies within 30 feet of you.</li>\n \
\t</list>\n \
\t<p>This effect ends early if you are incapacitated or die. Once you use this feature, you can't use it again until you finish a long rest.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Exalted Champion</name>\n \
<prepared type=\"number\">1</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<source type=\"string\">Paladin</source>\n \
<specialization type=\"string\">Oath of the Crown</specialization>\n";

addPaladinImprovedDivineSmite=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">DMG: 1d8 radiant, melee</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>By 11th level, you are so suffused with righteous might that all your melee weapon strikes carry divine power with them. Whenever you hit a creature with a melee weapon, the creature takes an extra 1d8 radiant damage. If you also use your Divine Smite with an attack, you add this damage to the extra damage of your Divine Smite.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Improved Divine Smite</name>\n \
<prepared type=\"number\">0</prepared>\n \
<source type=\"string\">Paladin</source>\n";

addPaladinLayOnHands=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">5</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level x5. As an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool.</p>\n \
\t<p>Alternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one.</p>\n \
\t<p>This feature has no effect on undead and constructs.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Lay on Hands</name>\n \
<prepared type=\"number\">20</prepared>\n \
<source type=\"string\">Paladin</source>\n";

addPaladinChampionChallengeCrown=" \
<actions>\n \
\t<id-00001>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>When you take this oath at 3rd level, you gain the following Channel Divinity options.</p>\n \
\t<p><b>Champion Challenge. </b>You issue a challenge that compels other creatures to do battle with you. Each creature of your choice that you can see within 30 feet of you must make a Wisdom saving throw. On a failed save, a creature can't willingly move more than 30 feet away from you. This effect ends on the creature if you are incapacitated or die or if the creature is moved more than 30 feet away from you.</p>\n \
\t<p><b>Turn the Tide. </b>As a bonus action, you can bolster injured creatures with your Channel Divinity. Each creature of your choice that can hear you within 30 feet of you regains hit points equal to 1d6 + your Charisma modifier (minimum of 1) if it has no more than half of its hit points.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Champion Challenge (Crown)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Oath of the Crown</specialization>\n";

addPaladinTurnTheTideCrown=" \
<actions>\n \
\t<id-00001>\n \
\t\t<heallist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">0</bonus>\n \
\t\t\t\t<dice type=\"dice\">d6</dice>\n \
\t\t\t\t<stat type=\"string\">charisma</stat>\n \
\t\t\t</id-00001>\n \
\t\t</heallist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">heal</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<name type=\"string\">Turn the Tide (Crown)</name>\n \
<prepared type=\"number\">0</prepared>\n";

addPaladinUnyieldingSpirit=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Oath of the Crown adv to save vs stunned or paralyzed;</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 15th level, you have advantage on saving throws to avoid becoming paralyzed or stunned.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Unyielding Spirit</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Oath of the Crown</specialization>\n";

addPaladinSacredWeaponDevotion=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">Sacred Weapon; ATK: [CHA];  DMGTYPE: magic</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<name type=\"string\">Sacred Weapon (Devotion)</name>\n \
<prepared type=\"number\">0</prepared>\n";

addPaladinTurnTheUnholyDevotion=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">turned</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<name type=\"string\">Turn the Unholy (Devotion)</name>\n \
<prepared type=\"number\">0</prepared>\n";

addPaladinAuraOfDevotion=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">IMMUNE: charmed</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Starting at 7th level, you and friendly creatures within 10 feet of you can't be charmed while you are conscious. At 18th level, the range of this aura increases to 30 feet.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Aura of Devotion</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Oath of Devotion</specialization>\n";

addPaladinPurityOfSpirit=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">IFT: TYPE(aberration,celestial,elemental,fey,fiend,undead);GRANTDISATK:</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">IFT: TYPE(aberration,celestial,elemental,fey,fiend,undead); IMMUNE: charmed, frightened</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Beginning at 15th level, you are always under the effects of a protection from evil and good spell.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Purity of Spirit</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Oath of Devotion</specialization>\n";

addPaladinHolyNimbus=" \
<actions>\n \
\t<id-00001>\n \
\t\t<damagelist>\n \
\t\t\t<id-00001>\n \
\t\t\t\t<bonus type=\"number\">10</bonus>\n \
\t\t\t\t<dice type=\"dice\"></dice>\n \
\t\t\t\t<type type=\"string\">radiant</type>\n \
\t\t\t</id-00001>\n \
\t\t</damagelist>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">damage</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 20th level, as an action, you can emanate an aura of sunlight. For 1 minute, bright light shines from you in a 30-foot radius, and dim light shines 30 feet beyond that. Whenever an enemy creature starts its turn in the bright light, the creature takes 10 radiant damage.</p>\n \
\t<p>In addition, for the duration, you have advantage on saving throws against spells cast by fiends or undead. Once you use this feature, you can't use it again until you finish a long rest.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Holy Nimbus</name>\n \
<prepared type=\"number\">1</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Oath of Devotion</specialization>\n";

addPaladinNaturesWrathAncients=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">strength</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">dexterity</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">restrained</label>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p></p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">0</locked>\n \
<name type=\"string\">Nature's Wrath (Ancients)</name>\n \
<prepared type=\"number\">0</prepared>\n \
<ritual type=\"number\">0</ritual>\n";

addPaladinTurnTheFaithlessAncients=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">turned</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<name type=\"string\">Turn the Faithless (Ancients)</name>\n \
<prepared type=\"number\">0</prepared>\n";

addPaladinAuraOfWarding=" \
<actions>\n \
\t<id-00001>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">RESIST: all</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>Beginning at 7th level, ancient magic lies so heavily upon you that it forms an eldritch ward. You and friendly creatures within 10 feet of you have resistance to damage from spells.</p>\n \
\t<p>At 18th level, the range of this aura increases to 30 feet.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Aura of Warding</name>\n \
<prepared type=\"number\">0</prepared>\n \
<specialization type=\"string\">Oath of the Ancients</specialization>\n";

addPaladinUndyingSentinal=" \
<actions>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<name type=\"string\">Undying Sentinel</name>\n \
<prepared type=\"number\">1</prepared>\n";

addPaladinElderChampion=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">Elder Champion; REGEN: 10</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">DISSAV: all</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<name type=\"string\">Elder Champion</name>\n \
<prepared type=\"number\">0</prepared>\n";

addPaladinAbjureEnemyVengeance=" \
<actions>\n \
\t<id-00001>\n \
\t\t<atkmod type=\"number\">0</atkmod>\n \
\t\t<atkprof type=\"number\">1</atkprof>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savedcmod type=\"number\">0</savedcmod>\n \
\t\t<savedcprof type=\"number\">1</savedcprof>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">frightened</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<apply type=\"string\">action</apply>\n \
\t\t<durmod type=\"number\">0</durmod>\n \
\t\t<label type=\"string\">IF: TYPE(fiend,undead);DISSAV:</label>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group> <level type=\"number\">0</level>\n \
<name type=\"string\">Abjure Enemy (Vengeance)</name>\n \
<prepared type=\"number\">0</prepared>\n";

addPaladinVowOfEnmityVengeance=" \
<actions>\n \
\t<id-00001>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">ADVATK:</label>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<targeting type=\"string\">self</targeting>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00001>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<name type=\"string\">Vow of Enmity (Vengeance)</name>\n \
<prepared type=\"number\">0</prepared>\n";

addPaladinAvengingAngel=" \
<actions>\n \
\t<id-00001>\n \
\t\t<order type=\"number\">1</order>\n \
\t\t<savetype type=\"string\">wisdom</savetype>\n \
\t\t<type type=\"string\">cast</type>\n \
\t</id-00001>\n \
\t<id-00002>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">frightened</label>\n \
\t\t<order type=\"number\">2</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00002>\n \
\t<id-00003>\n \
\t\t<durmod type=\"number\">1</durmod>\n \
\t\t<durunit type=\"string\">minute</durunit>\n \
\t\t<label type=\"string\">GRANTADVATK:</label>\n \
\t\t<order type=\"number\">3</order>\n \
\t\t<type type=\"string\">effect</type>\n \
\t</id-00003>\n \
</actions>\n \
<cast type=\"number\">0</cast>\n \
<description type=\"formattedtext\">\n \
\t<p>At 20th level, you can assume the form of an angelic avenger. Using your action, you undergo a transformation. For 1 hour, you gain the following benefits:</p>\n \
\t<list>\n \
\t\t<li>Wings sprout from your back and grant you a flying speed of 60 feet.</li>\n \
\t\t<li>You emanate an aura of menace in a 30-foot radius. The first time any enemy creature enters the aura or starts its turn there during a battle, the creature must succeed on a Wisdom saving throw or become frightened of you for 1 minute or until it takes any damage. Attack rolls against the frightened creature have advantage.</li>\n \
\t</list>\n \
\t<p>Once you use this feature, you can't use it again until you finish a long rest.</p>\n \
</description>\n \
<group type=\"string\">Class Features</group> \
<level type=\"number\">0</level>\n \
<locked type=\"number\">1</locked>\n \
<name type=\"string\">Avenging Angel</name>\n \
<prepared type=\"number\">1</prepared>\n \
<ritual type=\"number\">0</ritual>\n \
<specialization type=\"string\">Oath of Vengeance</specialization>\n";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * 

End of Paladin effects

* * * * * * * * * * * * * * * * * * * * * * * * * * */

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
