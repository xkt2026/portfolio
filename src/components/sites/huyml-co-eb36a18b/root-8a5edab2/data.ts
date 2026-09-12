/**
 * Verbatim content extracted from https://huyml.co/ (desktop / 1440px).
 *
 * This file is the single content seam: every string and image reference the site
 * renders resolves to a key below, so it is the one place to edit when filling or
 * replacing copy. `docs/CONTENT_MAP.md` maps each key to the region it drives.
 *
 * Produced by `scripts/build-data.mjs` -> `projects.json` -> `scripts/gen-data.mjs`.
 * Re-running that pipeline overwrites this file, so once you start editing copy,
 * do not re-run `gen-data.mjs`.
 */

export type ArchiveColors = readonly string[];

export interface ArchiveEntry {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly dateLabel: string;
  readonly colors: ArchiveColors;
  readonly roles: readonly string[];
  readonly ruler: readonly string[];
  readonly category: string;
  readonly description: string;
  /**
   * The case-study lead paragraph — the live `/project/<slug>` pages open with a
   * full paragraph, not the one-liner the rail shows. Falls back to `description`
   * when it is empty, so a project can ship with just the short copy.
   */
  readonly about?: string;
  readonly image: string;
}

export interface SelectedWork {
  readonly title: string;
  readonly tag: string;
  readonly description: string;
  readonly colors: ArchiveColors;
  /**
   * Role / Launch — the left-hand info band re-reads both every time the wheel
   * lands on a new index, so the band and the counter always describe the same
   * project. They are only the *fallback*: a card that carries a `slug` shows the
   * `roles` / `dateLabel` of its `ARCHIVE` entry instead, so the homepage and
   * `/project/<slug>` are edited in one place.
   */
  readonly roles: readonly string[];
  readonly launch: string;
  /**
   * Only the cards that are also real case studies carry one. Clicking the centred
   * card with a `slug` opens `/project/<slug>`, and the card then also draws that
   * project's cover between the two text columns; the rest of the wheel just spins.
   */
  readonly slug?: string;
}

export interface ContactLink {
  readonly label: string;
  readonly href: string;
}

export interface SocialGroup {
  readonly caption: string;
  readonly links: readonly ContactLink[];
}

export interface CreditRow {
  readonly role: string;
  readonly people: readonly ContactLink[];
}

export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export interface SiteMeta {
  readonly owner: string;
  readonly ownerAlias: string;
  readonly year: string;
  readonly role: string;
  readonly email: string;
  readonly launchLabel: string;
  readonly roleLabel: string;
  readonly scrollLabel: string;
  readonly selectedLabel: string;
  readonly archiveLabel: string;
  /** Case-study labels — `/project/<slug>` only. */
  readonly aboutLabel: string;
  readonly nextProjectLabel: string;
  readonly menuLabel: string;
  readonly inquiriesLabel: string;
  readonly copyLabel: string;
  readonly copiedLabel: string;
  readonly showreelLabel: string;
  readonly closeLabel: string;
  readonly contactTitle: string;
  readonly ownerLines: readonly string[];
  readonly contactGroups: readonly SocialGroup[];
  readonly creditsTitle: string;
  readonly credits: readonly CreditRow[];
}

export const SITE: SiteMeta = {
  "owner": "QTING",
  "ownerAlias": "QTING",
  "year": "2023",
  "role": "Independent designer",
  "email": "xkt202311@163.com",
  "launchLabel": "Launch",
  "roleLabel": "Role",
  "scrollLabel": "Scroll",
  "selectedLabel": "Selected work",
  "archiveLabel": "View the full archive",
  "aboutLabel": "About",
  "nextProjectLabel": "Next project",
  "menuLabel": "Menu",
  "inquiriesLabel": "For inquiries",
  "copyLabel": "Click to copy",
  "copiedLabel": "Copied",
  "showreelLabel": "ALL",
  "closeLabel": "Close",
  "contactTitle": "Come say hi",
  "ownerLines": [
    "Independent designer",
    "Working globally"
  ],
  "contactGroups": [
    {
      "caption": "Drop me a line",
      "links": [
        {
          "label": "xkt202311@163.com",
          "href": "mailto:xkt202311@163.com"
        }
      ]
    },
    {
      "caption": "Hear me yapping about design",
      "links": [
        {
          "label": "YouTube",
          "href": "https://youtu.be/OtqKieUon78?feature=shared"
        }
      ]
    }
  ],
  "creditsTitle": "Credits",
  "credits": [
    {
      "role": "Development & Rive",
      "people": [
        {
          "label": "Chien Pham",
          "href": "https://x.com/BausPjam"
        }
      ]
    },
    {
      "role": "Illustration",
      "people": [
        {
          "label": "Yup Nguyen",
          "href": "https://dribbble.com/yupnguyen"
        }
      ]
    },
    {
      "role": "Fonts",
      "people": [
        {
          "label": "BT Glyphius",
          "href": "https://www.myfonts.com/collections/bt-glyphius-font-bitstream"
        },
        {
          "label": "BT Grotesk",
          "href": "https://www.myfonts.com/collections/bt-grotesk-font-bitstream"
        }
      ]
    },
    {
      "role": "Copywriting",
      "people": [
        {
          "label": "Ha Nguyen (the wife)",
          "href": "https://www.youtube.com/@theimpulsivestitch"
        }
      ]
    }
  ]
};

export const NAV: readonly NavItem[] = [
  {
    "label": "WORK",
    "href": "#work"
  },
  {
    "label": "ABOUT",
    "href": "#about"
  },
  {
    "label": "PLAYGROUND",
    "href": "#playground"
  },
  {
    "label": "CONTACT",
    "href": "#contact"
  }
];

export const WHEEL: readonly SelectedWork[] = [
  {
    "title": "China Unicom 5G Era KV Design",
    "tag": "Visual Identity\n视觉形象",
    "description": "Working with Hon Tran to bring Mathijs's vision and personality to his portfolio.",
    "colors": [
      "rgb(34, 34, 34)",
      "rgb(240, 240, 240)",
      "rgb(255, 0, 0)"
    ],
    "roles": [
      "Art Director",
      "Website Design"
    ],
    "launch": "2023",
    "slug": "district2-studio",
  },
  {
    "title": "China Telecom 5G Series",
    "tag": "Brand - scene\n品牌-场景",
    "description": "A series of China Telecom 5G campaign key visuals.",
    "colors": [
      "rgb(0, 123, 199)",
      "rgb(0, 204, 204)",
      "rgb(255, 255, 255)"
    ],
    "roles": [
      "Jiuyi Advertising Co., Ltd.",
      "Visual Designer"
    ],
    "launch": "2019-2020",
    "slug": "telecom-5g-series",
  },
  {
    "title": "JUNER CARL",
    "tag": "Advertising - photography (womenswear)\n广告-摄影（女装）",
    "description": "Summer collection campaign shot by the sea, built on natural beauty and light fashion.",
    "colors": [
      "rgb(214, 226, 232)",
      "rgb(226, 214, 196)",
      "rgb(28, 28, 28)"
    ],
    "roles": [
      "Photography",
      "Retouching"
    ],
    "launch": "2019",
    "slug": "juner-carl",
  },
  {
    "title": "CREDIT APP UI",
    "tag": "UI/UX - App Design\n界面设计",
    "description": "A glassmorphism credit dashboard exploring dark-mode cards, score history and bank-offer flows.",
    "colors": [
      "rgb(15, 17, 21)",
      "rgb(124, 186, 92)",
      "rgb(176, 122, 122)"
    ],
    "roles": [
      "UI Design",
      "Interaction"
    ],
    "launch": "2026",
    "slug": "credit-app-ui",
  },
  {
    "title": "FAIRWAY EDITORIAL",
    "tag": "Advertising - Photography\n广告-摄影",
    "description": "Fashion editorial on a golf course, balancing tailored silhouettes with the quiet geometry of the green.",
    "colors": [
      "rgb(58, 90, 58)",
      "rgb(232, 224, 208)",
      "rgb(212, 185, 106)"
    ],
    "roles": [
      "Photography-AIGC"
    ],
    "launch": "2026",
    "slug": "fairway-editorial",
  },
  {
    "title": "MATERIALISM",
    "tag": "Jewelry - crystal necklace\n饰品-水晶项链",
    "description": "Geometric forms and shadow stage the crystal necklace so the sparkle takes the frame.",
    "colors": [
      "rgb(238, 236, 231)",
      "rgb(198, 199, 201)",
      "rgb(22, 22, 24)"
    ],
    "roles": [
      "Photography",
      "Retouching"
    ],
    "launch": "2020",
    "slug": "materialism-necklace",
  },
  {
    "title": "EAR MANUAL",
    "tag": "Manual Design\n手册设计",
    "description": "A popular-science booklet on the ear: how hearing is formed, the myths around ear care, and the common ear diseases.",
    "colors": [
      "rgb(91, 87, 124)",
      "rgb(211, 213, 83)",
      "rgb(84, 76, 151)"
    ],
    "roles": [
      "Graphic Design",
      "Illustration"
    ],
    "launch": "2021",
    "slug": "ear-manual",
  },
  {
    "title": "HONGKONG 72 hours",
    "tag": "Creative - direction",
    "description": "A 72-hour shooting challenge capturing the light, streets and spirit of Hong Kong.",
    "colors": [
      "rgb(5, 18, 54)",
      "rgb(255, 253, 226)",
      "rgb(4, 87, 212)"
    ],
    "roles": [
      "Lead Designer"
    ],
    "launch": "2015-2025",
    "slug": "biy",
  }
] as const;

export const ARCHIVE: readonly ArchiveEntry[] = [
  {
    "slug": "biy",
    "title": "HONGKONG 72 hours",
    "date": "2015-2025",
    "dateLabel": "2015-2025",
    "colors": [
      "rgb(5, 18, 54)",
      "rgb(255, 253, 226)",
      "rgb(4, 87, 212)"
    ],
    "roles": [
      "Lead Designer"
    ],
    "ruler": [
      "Role"
    ],
    "category": "Creative Direction",
    "description": "A 72-hour shooting challenge capturing the light, streets and spirit of Hong Kong.",
    "about": "A 72-hour shooting challenge to capture the light, people and scenery of Hong Kong — the hazy neon glow, the vintage taxis. Welcome to Hong Kong!\n\nHong Kong cinema of the 1980s and 90s showed us a vibrant city: neon-lit streets, taxis flashing their red taillights, and the hardworking spirit of Hong Kong people. I set out to capture that cinematic Hong Kong with my camera — the humid sea breeze, the ticking of the traffic lights, from the silence of dawn to the indulgence of night. This is Hong Kong.\n\nProcess: this work is built from footage shot over many years. The earliest material was filmed ten years ago, and the most recent on a day in 2024. Three days of footage in total — every frame one of a kind.\n\n一场72小时的拍摄挑战，旨在记录香港的光线、人文和风景，那朦胧的霓虹灯光、复古的出租车，欢迎来到香港！\n\n八九十年代的香港电影向我们展现了一座充满活力的城市：霓虹灯照亮的街道、闪着红色车灯的出租车，以及香港人勤劳的精神。我试图用相机捕捉那个电影中的香港。潮湿的海风、红绿灯的滴答声，从寂静的黎明到纵情的夜晚……这就是香港。\n\n创作过程：这是一部用多年拍摄素材制作而成的作品，最早的素材拍摄于10年前，最近的一段素材拍摄于2024年的某一天，总共三天的素材，每一帧都独一无二。",
    "image": "biy-01.png"
  },
  {
    "slug": "district2-studio",
    "title": "DISTRICT2 STUDIO",
    "date": "2019-09-24",
    "dateLabel": "2019",
    "colors": [
      "rgb(255, 255, 255)",
      "rgb(0, 0, 0)",
      "rgb(61, 61, 61)"
    ],
    "roles": [
      "Jiuyi Advertising Co., Ltd.",
      "Visual Designer"
    ],
    "ruler": [
      "Team",
      "Role"
    ],
    "category": "Agency & Studio",
    "description": "Designing the new website for District2, the first studio I ever worked at and my very first creative website project.",
    "about": "In the 5G era of China Unicom, data becomes the soil where all things connect and flourish. Let the seeds of ideals take root in this digital land — a tree synthesized from data spreads its branches in every direction, linking this moment with the future so that the future keeps growing through connection. The palette interweaves blue and white, echoing the technological core of China Unicom: everything connected, an intelligent and connected future.\n\n中国联通5G时代，以数据为壤，使万物互联共生，催生万物蓬勃生长。让理想的种子扎根数字沃土，以数据合成的树向四面八方延展枝桠，联通此刻与未来，让未来在互联中持续生长。配色以蓝白交织，呼应中国联通万物互联、智联未来的科技内核。",
    "image": "unicom-5g-cover.png"
  },
  {
    "slug": "telecom-5g-series",
    "title": "CHINA TELECOM 5G SERIES",
    "date": "2019-2020",
    "dateLabel": "2019-2020",
    "colors": [
      "rgb(0, 123, 199)",
      "rgb(0, 204, 204)",
      "rgb(255, 255, 255)"
    ],
    "roles": [
      "Jiuyi Advertising Co., Ltd.",
      "Visual Designer"
    ],
    "ruler": [
      "Team",
      "Role"
    ],
    "category": "Visual Identity",
    "description": "A series of China Telecom 5G campaign key visuals for tourism, healthcare, smart home, industry and lifestyle scenarios.",
    "about": "5G makes everything possible\n\n5G让一切可能",
    "image": "telecom-5g-01.jpg"
  },
  {
    "slug": "juner-carl",
    "title": "JUNER CARL",
    "date": "2019",
    "dateLabel": "2019",
    "colors": [
      "rgb(214, 226, 232)",
      "rgb(226, 214, 196)",
      "rgb(28, 28, 28)"
    ],
    "roles": [
      "Photography",
      "Retouching"
    ],
    "ruler": [
      "Role"
    ],
    "category": "Advertising - Photography",
    "description": "Summer collection campaign shot by the sea, built on natural beauty and light fashion.",
    "about": "JUNER CARL spring/summer collection launch. The direction is natural beauty and light fashion, and the shoot was set on the beach. Every frame brings out how softly the wetsuit fabric sits on the skin, and the clean silhouette it draws once worn.\n\nJUNER CARL 春夏新品发布。以自然美、轻时尚为设计点，拍摄选择在海边。画面主要突出潜水服面料的亲肤质感，以及上身后修饰出的完美曲线。",
    "image": "juner-carl-01.jpg"
  },
  {
    "slug": "credit-app-ui",
    "title": "CREDIT APP UI",
    "date": "2026",
    "dateLabel": "2026",
    "colors": [
      "rgb(15, 17, 21)",
      "rgb(124, 186, 92)",
      "rgb(176, 122, 122)"
    ],
    "roles": [
      "UI Design",
      "Interaction"
    ],
    "ruler": [
      "Role"
    ],
    "category": "UI/UX Design",
    "description": "A glassmorphism credit dashboard exploring dark-mode cards, score history and bank-offer flows.",
    "about": "A dark-mode credit dashboard concept built around glassmorphism and data clarity. The design stacks bank cards, score history and credit offers into a single calm interface where information hierarchy replaces visual noise.\n\n深色模式信用卡仪表盘概念，围绕玻璃拟态与数据清晰性展开。将银行卡片、信用历史和信贷优惠堆叠成一个安静的界面，让信息层级取代视觉噪音。",
    "image": "credit-app-ui-01.png"
  },
  {
    "slug": "fairway-editorial",
    "title": "FAIRWAY EDITORIAL",
    "date": "2026",
    "dateLabel": "2026",
    "colors": [
      "rgb(58, 90, 58)",
      "rgb(232, 224, 208)",
      "rgb(212, 185, 106)"
    ],
    "roles": [
      "Photography-AIGC"
    ],
    "ruler": [
      "Role"
    ],
    "category": "Advertising - Photography",
    "description": "Fashion editorial on a golf course, balancing tailored silhouettes with the quiet geometry of the green.",
    "about": "A fashion story shot on the golf course. The pale green, sand traps and winding paths become the set, while a tailored jacket and flowing white pieces play against the landscape's soft geometry.\n\n一组在高尔夫球场拍摄的时尚故事。浅绿草坪、沙坑与蜿蜒球道成为天然布景，剪裁利落的夹克与飘逸的白色单品在柔和的几何线条中形成对比。",
    "image": "fairway-editorial-01.jpg"
  },
  {
    "slug": "materialism-necklace",
    "title": "MATERIALISM",
    "date": "2020",
    "dateLabel": "2020",
    "colors": [
      "rgb(238, 236, 231)",
      "rgb(198, 199, 201)",
      "rgb(22, 22, 24)"
    ],
    "roles": [
      "Photography",
      "Retouching"
    ],
    "ruler": [
      "Role"
    ],
    "category": "Jewelry - Crystal Necklace",
    "description": "Geometric forms and shadow stage the crystal necklace so the sparkle takes the frame.",
    "about": "The hero of this MATERIALISM series is the crystal necklace. To bring out the piece itself and the way the chain frames the neck, geometric shapes and layered shadow build a controlled setting where the sparkle becomes the subject.\n\nMATERIALISM 系列主打品为水晶项链。为突出主体本身以及链条对颈部的修饰，用几何形配合阴影打造一个环境，凸显水晶的闪耀。",
    "image": "materialism-01.jpg"
  },
  {
    "slug": "ear-manual",
    "title": "EAR MANUAL",
    "date": "2021",
    "dateLabel": "2021",
    "colors": [
      "rgb(91, 87, 124)",
      "rgb(211, 213, 83)",
      "rgb(84, 76, 151)"
    ],
    "roles": [
      "Graphic Design",
      "Illustration"
    ],
    "ruler": [
      "Role"
    ],
    "category": "Manual Design",
    "description": "A popular-science booklet on the ear: how hearing is formed, the myths around ear care, and the common ear diseases.",
    "about": "A popular-science booklet on the ear. Oversized condensed headlines, type cropped at the page edge and a purple-and-lime palette carry dense medical copy — from how hearing is formed, to the myths around ear care and the common ear diseases — with all diagram work kept to a single-line illustration style.\n\n一本关于耳朵的科普读物。用超大号粗黑标题、裁切溢出的排版和紫＋黄绿的强对比配色，承载密集的医学内容：从听觉的形成，到关于耳朵的常见误区，再到耳部常见疾病，插图统一为单线描风格。",
    "image": "ear-manual-01.jpg"
  },
  {
    "slug": "eislab",
    "title": "EISLAB",
    "date": "2025-02-12",
    "dateLabel": "February 2025",
    "colors": [
      "rgb(199, 179, 255)",
      "rgb(28, 20, 86)",
      "rgb(247, 226, 115)"
    ],
    "roles": [
      "Visual Designer"
    ],
    "ruler": [
      "Role"
    ],
    "category": "Food & Beverage",
    "description": "Refreshed the digital identity for this German ice cream brand, transforming a more colorful and tasteful website experience.",
    "about": "Eislab reached out for a website redesign and a bit of a brand refresh. They wanted to move away from a serious, \"lab\" feeling and toward something much more joyful and delicious. I updated the typography and color palette, then brought that new identity to life with rich interactions and motion. The whole point was to give users a fresh, happy feeling the moment they start experiencing the site.",
    "image": "BsJb1GV0DDjj2B5ELG33XfWmQ.jpg"
  }
] as const;

export const assetUrl = (file: string): string => `/portfolio/sites/huyml-co-eb36a18b/shared/${file}`;

/**
 * The four faces of the rotating logo stamp pinned to the top-left of the canvas.
 *
 * Order = spin order (front → right → back → left); `SiteStamp` renders each face at
 * 56×123 inside a 56px-deep box. The files carry stable names on purpose: a fresh
 * Figma export can be dropped on top of `shared/stamp-face-1..4.png` with no code
 * change. The original Framer exports were R4RlD3IldAw8k5cRONJ8SJJgqG4.svg and
 * Bi57PSNgEGNhXnUjCjYBKAacRQ.svg (46×106) plus EwHniTuZoV3ME15lpjBiKTAYilc.svg and
 * JZyDNnSPROUpFuFHbWYIKApoHng.svg (50×107 — 2px bleed for the red stroke).
 */
export const STAMP_FACES: readonly string[] = [
  "stamp-face-1.png",
  "stamp-face-2.png",
  "stamp-face-3.png",
  "stamp-face-4.png",
];
