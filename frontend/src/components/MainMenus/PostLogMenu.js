const PostLogmenus = [
  {
      id: 1,
      linkText: 'Home',
      child: true,
      icon: 'angle-down',
      submenu: [
          {
              id: 4,
              link: '/news/news-fields',
              linkText: 'News Fields'
          },
          {
              id: 5,
              link: '/news/news-articles',
              linkText: 'News Details'
          },

      ]
  },
  {
      id: 2,
      linkText: 'About',
      link: '/about'
  },
  {
      id: 3,
      linkText: 'Contact',
      link: '/contact'
  },
];

export default PostLogmenus;