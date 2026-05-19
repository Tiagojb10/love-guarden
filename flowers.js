// ============================================================
//  CUSTOMISE YOUR GARDEN HERE
//  Each object is one flower. Add as many as you like!
//
//  type: "poem" | "memory" | "photo"
//  color: "pink" | "lavender" | "white" | "red" | "gold" | "blue"
//  For "photo" type, set imageUrl to a path like "photos/us.jpg"
// ============================================================

const GARDEN_TITLE = "For You, My Love";          // shown on intro screen
const PARTNER_NAME = "My Love";                    // used in the header

const flowers = [
  {
    id: 1,
    color: "pink",
    type: "poem",
    icon: "🌸",
    label: "a poem for you",
    title: "You Are My tomorrow",
    content: `for as long
as the sun sets
and the moon rises
it is you
that i want
in all of my tomorrows.`,
    footer: "ida banks ✦"
  },
{
  id: 2,
  color: "lavender",
  type: "memory",
  icon: "💜",
  label: "a nossa história",
  title: "O Dia em que Tudo Começou",
  content: `Lembro do dia em que tentei confessar
os meus sentimentos por ti
e tu fizeste isso por mim.

Estava tão nervoso,
quase a desistir —
e tu facilitaste tudo.

Até hoje não me arrependo
de ter ganho coragem de falar contigo
naquele dia.

Foi também a primeira vez
que nos beijámos.
Foi um susto primeiro,
mas soube tão bem.`,
  footer: "o início de tudo ✦"
},
  {
    id: 3,
    color: "white",
    type: "photo",
    icon: "🤍",
    label: "US",
    title: "Us",
    // Replace with your own image path, e.g. "photos/us.jpg"
    imageUrl: "photos/us.jpeg",
    imageCaption: "add your photo here — place it in a /photos folder and update imageUrl in flowers.js",
    content: `Every photo with you
is my favourite photo.`
  },
{
  id: 4,
  color: "red",
  type: "poem",
  icon: "❤️",
  label: "from my heart",
  title: "Our song",
  content: `Enquanto eu viver eu prometo amor

Sarar tuas feridas fazer te esquecer da dor

Enquanto eu viver prometo amar

Mas eu prometo muito deixa so concretizar

The song that plays in my head, when I think of you.`,
  footer: "the little things ✦"
},
  {
    id: 5,
    color: "gold",
    type: "memory",
    icon: "✨",
    label: "a poem for you",
    title: "To my favourite song",
    content: `Meeting you was like
listening to a song
for the first time
and knowing it
would be my favorite.`,
    footer: "your favourite melody  ✦"
  },
];