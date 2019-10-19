export const Changelog: { [id: string]: string } = {
    "1.0.0": "* Initial release.",

    "1.0.1": "* Type encapsulation for ServerData and Archetype.",

    "1.1.0": "* Badge icons are now urls instead of keys.\n" +
        "* Badge icons have moved from `badge.imageKeys` to `badge.icons`.\n" +
        "* Changelog is now just a markdown block instead of a string array.\n",

    "1.1.1": "* `IGameMap.links` is now optional.",

    "1.1.2": "* https://github.com/n15g/coh-content-db/issues/3 - Added `setTitleId` property for badges. Used to store the `settitle` slash command number of the badge.",

    "1.1.3": "* Added some content reference utility functions."
};
