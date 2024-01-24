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
