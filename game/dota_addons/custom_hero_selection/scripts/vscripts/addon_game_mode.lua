-- Generated from template

if CAddonTemplateGameMode == nil then
	CAddonTemplateGameMode = class({})
end

function Precache( context )
	--[[
		Precache things we know we'll use.  Possible file types include (but not limited to):
			PrecacheResource( "model", "*.vmdl", context )
			PrecacheResource( "soundfile", "*.vsndevts", context )
			PrecacheResource( "particle", "*.vpcf", context )
			PrecacheResource( "particle_folder", "particles/folder", context )
	]]
end

-- Create the game mode when we activate
function Activate()
	GameRules.AddonTemplate = CAddonTemplateGameMode()
	GameRules.AddonTemplate:InitGameMode()
end

function CAddonTemplateGameMode:InitGameMode()
	print( "Template addon is loaded." )

    GameRules:SetCustomGameSetupAutoLaunchDelay(0)

	local GameMode = GameRules:GetGameModeEntity()
    GameMode:SetCustomGameForceHero("npc_dota_hero_wisp")

	CustomGameEventManager:RegisterListener("js_player_select_hero", OnJSPlayerSelectHero)

	GameMode:SetThink("OnThink", self, "GlobalThink", 2)
end

-- Evaluate the state of the game
function CAddonTemplateGameMode:OnThink()
	if GameRules:State_Get() == DOTA_GAMERULES_STATE_GAME_IN_PROGRESS then
		--print( "Template addon script is running." )
	elseif GameRules:State_Get() >= DOTA_GAMERULES_STATE_POST_GAME then
		return nil
	end
	return 1
end

function OnJSPlayerSelectHero(event, keys)
	local player_id = keys["PlayerID"]
	local hero_name = keys["hero_name"]
	
	local current_hero_name = PlayerResource:GetSelectedHeroName(player_id)
  	if current_hero_name == nil then
    	return
  	end

	if current_hero_name == "npc_dota_hero_wisp" then
    	local selectedHero = PlayerResource:ReplaceHeroWith(player_id, hero_name, PlayerResource:GetGold(player_id), 0)
    	if selectedHero == nil then
			return
    	end
  	end

	local player = PlayerResource:GetPlayer(player_id)
  	if player ~= nil then
    	CustomGameEventManager:Send_ServerToPlayer(player, "selection_end", {})
  	end
end