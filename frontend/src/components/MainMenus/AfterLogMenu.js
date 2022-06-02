
export const AfterLogmenus = (name,role) => {


   const Citems=
   [
    {
        id: 1,
        linkText: 'News',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 8,
                link: '/news/news-fields',
                linkText: 'News Fields'
            },
            {
                id: 9,
                link: '/news/news-articles',
                linkText: 'News Details'
            },
  
        ]
    },
    {
        id: 2,
        linkText: 'E-services',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 10,
                link: '/service',
                linkText: 'Costum Standby'
            },
            {
                id: 11,
                link: '/single-service',
                linkText: 'NewsLetters'
            },
        ]
    },
    {
        id: 3,
        linkText: 'E-bib',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 12,
                link: '/portfolio',
                linkText: 'Scientific Events',
            },
            {
                id: 13,
                link: '/single-portfolio',
                linkText: 'Cooperations & Tenders',
            },
            {
                id: 14,
                link: '/Magazines',
                linkText: 'News magazines',
            },
        ]
    },
    {
        id: 4,
        linkText: 'About',
        link: '/about'
    },
    {
        id: 5,
        linkText: 'Contact',
        link: '/contact'
    },
    {
        id: 6,
        linkText: null,
        link: '/'
    },
    {
      id: 7,
      linkText:name,
      child: true,
      icon: 'angle-down',
      submenu: [
          {
              id: 15,
              link: '/user/current',
              linkText: 'Home'
          },
          {
              id: 16,
              link: '/user/logout',
              linkText: 'Logout'
          },
  
      ]
  }
  ];
  const Aitems=
   [
    {
        id: 1,
        linkText: 'News',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 9,
                link: '/news/news-fields',
                linkText: 'News Fields'
            },
            {
                id: 10,
                link: '/news/news-articles',
                linkText: 'News Details'
            },
  
        ]
    },
    {
        id: 2,
        linkText: 'E-services',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 11,
                link: '/service',
                linkText: 'Costum Standby'
            },
            {
                id: 12,
                link: '/single-service',
                linkText: 'NewsLetters'
            },
        ]
    },
    {
        id: 3,
        linkText: 'E-bib',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 13,
                link: '/portfolio',
                linkText: 'Scientific Events',
            },
            {
                id: 14,
                link: '/single-portfolio',
                linkText: 'Cooperations & Tenders',
            },
            {
                id: 15,
                link: '/Magazines',
                linkText: 'News magazines',
            },
        ]
    },
    {
        id: 4,
        linkText: 'Assets',
        child: true,
        icon: 'angle-down',
        submenu: [
            {
                id: 16,
                link: '/assets/users',
                linkText: 'Humains'
            },
            {
                id: 17,
                link: '/assets/materials',
                linkText: 'Materials'
            },
        ]
    },
    {
        id: 5,
        linkText: 'About',
        link: '/about'
    },
    {
        id: 6,
        linkText: 'Contact',
        link: '/contact'
    },
    {
        id: 7,
        linkText: null,
        link: '/'
    },
    {
      id: 8,
      linkText:name,
      child: true,
      icon: 'angle-down',
      submenu: [
          {
              id: 18,
              link: '/user/current',
              linkText: 'Home'
          },
          {
              id: 19,
              link: '/user/logout',
              linkText: 'Logout'
          },
  
      ]
  }
  ]

   return((role ==='admin') ? Aitems : Citems);

    };
