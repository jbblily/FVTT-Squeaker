Hooks.on("init", () => {
  game.settings.register("squeaker", "chatSound", {
    name: "Chat sound file path",
    scope: "world",
    config: true,
    default: "modules/squeaker/squeak.wav",
    type: String,
    hint:
      "The default squeaking is provided to you by InspectorJ from freesound.org, replace by sounds/notify.wav if you're no fun.",
  });

  game.settings.register("squeaker", "enableChat", {
    name: "Enable chat sound",
    hint: "Plays the sound when a chat message is received.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register("squeaker", "chatActive", {
    name: "Chat sound muted when chat is active",
    hint: "Disable the chat sound when the chat is visible.",
    scope: "client",
    config: true,
    default: true,
    type: Boolean,
  });

  game.settings.register("squeaker", "rollSound", {
    name: "Roll sound file path",
    hint: "The default sound is sounds/dice.wav.",
    scope: "world",
    config: true,
    default: "sounds/dice.wav",
    type: String,
  });

  game.settings.register("squeaker", "enableRoll", {
    name: "Enable dice roll sound",
    hint: "Plays the sound when a roll is received.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });

  game.settings.register("squeaker", "rollActive", {
    name: "Roll sound muted when chat is active",
    hint: "Disable the roll sound when the chat is visible.",
    scope: "client",
    config: true,
    default: false,
    type: Boolean,
  });
  AudioHelper.preloadSound(game.settings.get("squeaker", "rollSound"));
  AudioHelper.preloadSound(game.settings.get("squeaker", "chatSound"));
});

Hooks.on("renderChatMessage", (msg, html) => {
  let chatIsActive = ui.sidebar.activeTab == "chat";
  if (msg.isRoll) {
    if (game.settings.get("squeaker", "enableRoll") && (!document.hasFocus() || !chatIsActive || !game.settings.get("squeaker", "rollActive"))) {
      msg.sound = game.settings.get("squeaker", "rollSound");
    } else {
      msg.sound = null;
    }
  } else {
    if (game.settings.get("squeaker", "enableChat") && (!document.hasFocus() || !chatIsActive || !game.settings.get("squeaker", "chatActive"))) {
      msg.sound = game.settings.get("squeaker", "chatSound");
    } else {
      msg.sound = null;
    }
  }
});
