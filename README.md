# 🕵️‍♂️ DiscordMemberScraper

This is a simple JavaScript script designed to scrape the IDs of members from a Discord server and output them in JSON format.

**Note:** This script is intended to be run either in the browser or the desktop app.

## 🚀 Usage

1. Open your web browser or Discord app.
2. Navigate to the Discord server from which you want to scrape members.
3. Open Developer Tools (`Ctrl+Shift+I` or `Cmd+Opt+I`).
4. Go to the "Console" tab.
5. Copy and paste the code below into the console.
6. Press Enter to execute the script.

## 🧾 Code

```javascript
const memberList = document.querySelector("div[class^='members__']");

let memberIds = [];

function getStringBetween(sourceString, startString, endString) {
    const regexPattern = new RegExp(startString + '(.*?)' + endString);
    const match = sourceString.match(regexPattern);
    return match ? match[1] : null;
}

while (true) {
    const jsonstr = JSON.stringify(memberIds);
    const members = memberList.querySelectorAll("div[class^='member_']");

    for (m of members) {
        const link = m.querySelector("img").src;
        if (!link.includes('avatars')) continue;
        if (link.includes('/users/')) memberIds.push(getStringBetween(link, '/users/', '/avatars'));
        else memberIds.push(getStringBetween(link, '/avatars/', '/'));
    }

    memberIds = [...new Set(memberIds)];
    if (jsonstr === JSON.stringify(memberIds)) break;

    memberList.scrollBy(0, 800);

    await new Promise(resolve => setTimeout(resolve, 500));
}

try {
    prompt(`Collected ${memberIds.length} member IDs:`, JSON.stringify(memberIds));
} catch (e) {
    console.log(JSON.stringify(memberIds));
    console.log(`Collected ${memberIds.length} member IDs.`);
}
```

## 🚧 Known Issues

- It will not scrape users that do not have an avatar.
- Offline users can't be scraped if the offline list is hidden.

## ⚠️ Disclaimer

This script is for educational and informational purposes only. Use it responsibly and ensure compliance with Discord's terms of service.
