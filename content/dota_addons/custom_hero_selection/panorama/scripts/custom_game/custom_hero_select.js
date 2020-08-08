var heroIndex = 0;
var hero_details = [
    {
        name: "#npc_dota_hero_brewmaster",
        abilities: [
            {
                icon: "bounty_hunter_shuriken_toss",
                name: "fufu_shuriken"
            },
            {
                icon: "blue_dragonspawn_sorcerer_evasion",
                name: "fufu_dodge"
            },
            {
                icon: "clinkz_wind_walk",
                name: "fufu_cloak"
            },
            {
                icon: "brewmaster_thunder_clap",
                name: "fufu_stomp"
            },
            {
                icon: "antimage_blink",
                name: "fufu_blink"
            }
        ]
    },
    {
        name: "#npc_dota_hero_night_stalker",
        abilities: [
            {
                icon: "bounty_hunter_shuriken_toss",
                name: "fufu_shuriken"
            },
            {
                icon: "blue_dragonspawn_sorcerer_evasion",
                name: "fufu_dodge"
            },
            {
                icon: "night_stalker_darkness",
                name: "fufu_mirror_image"
            },
            {
                icon: "brewmaster_thunder_clap",
                name: "fufu_stomp"
            },
            {
                icon: "fufu_stasis_trap",
                name: "fufu_stasis_trap"
            }
        ]
    },
    {
        name: "#npc_dota_hero_bounty_hunter",
        abilities: [
            {
                icon: "bounty_hunter_shuriken_toss",
                name: "fufu_shuriken"
            },
            {
                icon: "blue_dragonspawn_sorcerer_evasion",
                name: "fufu_dodge"
            },
            {
                icon: "clinkz_wind_walk",
                name: "fufu_cloak"
            },
            {
                icon: "techies_land_mines",
                name: "fufu_bomb"
            },
            {
                icon: "phantom_assassin_phantom_strike",
                name: "fufu_blink_strike"
            }
        ]
    },
    {
        name: "#npc_dota_hero_treant",
        abilities: [
            {
                icon: "bounty_hunter_shuriken_toss",
                name: "fufu_shuriken"
            },
            {
                icon: "blue_dragonspawn_sorcerer_evasion",
                name: "fufu_dodge"
            },
            {
                icon: "monkey_king_tree_dance",
                name: "fufu_tree_dance"
            },
            {
                icon: "furion_teleportation",
                name: "fufu_teleportation"
            },
            {
                icon: "phantom_assassin_phantom_strike",
                name: "fufu_blink_strike"
            }
        ]
    },
]

function OnSelectionEnd()
{
    HideHeroSelection();
}

function OnHighlightHero(index)
{
    heroIndex = index;

    var hero_detail = hero_details[index];
    $('#HeroName').text = $.Localize(hero_detail.name);
    for (var i = 0; i < 5; i++)
    {
        $("#HeroAbility" + i).abilityname = hero_detail.abilities[i].icon;
    }

    for (var i = 0; i < 4; i++)
    {
        if (i == index) {
            $("#HeroImage" + index).style["backgroundColor"] = "#FFD700";
        } else {
            $("#HeroImage" + i).style["backgroundColor"] = "#000000";
        }
    }
}

function OnMouseOver(index)
{
    $.DispatchEvent(
        "DOTAShowAbilityTooltip",
        $("#HeroAbility" + index),
        hero_details[heroIndex].abilities[index].name
    );
}

function OnMouseOut(index)
{
    $.DispatchEvent(
        "DOTAHideAbilityTooltip"
    );
}

function OnHeroMouseOver(index)
{
    $.DispatchEvent(
        "DOTAShowTitleTextTooltip",
        $("#HeroImage" + index),
        $.Localize(hero_details[index].name),
        $.Localize(hero_details[index].name + "_lore")
    );
}

function OnHeroMouseOut(index)
{
    $.DispatchEvent(
        "DOTAHideTitleTextTooltip"
    );
}

function OnSelectHero()
{
    var hero_names = [
        "npc_dota_hero_brewmaster",
		"npc_dota_hero_night_stalker",
		"npc_dota_hero_bounty_hunter",
		"npc_dota_hero_treant",
    ];

    var payload = {
        "hero_name": hero_names[heroIndex]
    };

    // $.Msg("payload: " + JSON.stringify(payload));
    
    GameEvents.SendCustomGameEventToServer(
        "js_player_select_hero",
        payload
    );
    
	Game.EmitSound("Conquest.capture_point_timer.Generic");
}

function HideHeroSelection()
{
    $("#HeroSelectRoot").visible = false;
}

function ShowHeroSelection()
{
    $("#HeroSelectRoot").visible = true;
}

(function(){
    GameEvents.Subscribe("selection_end", OnSelectionEnd);
    OnHighlightHero(heroIndex);

    var localPlayer = Game.GetLocalPlayerInfo();
    if (localPlayer) {
        var selectedHero = localPlayer.player_selected_hero;
        if (selectedHero) {
            if (selectedHero === "npc_dota_hero_wisp") {

            } else {
                HideHeroSelection();
            }
        }
    }
})();