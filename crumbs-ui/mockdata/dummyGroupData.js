const dummyGroupData = {
    'global_dev':{
        name:'Global Developers',
        membercount: 5,
        files: [{
          id: 314678,
          name:'Google_Analytics_tutorial_Full.mp4',
          type: 'video',
          size: 1.5
        },{
          id: 314228,
          name:'Analysis_Of_Data.pdf',
          type: 'document',
          size: 2.5
        },{
          id: 882211,
          name:'All_Time_Metal_mashup.mp3',
          type: 'music',
          size: 0.59
        },{
          id: 820841,
          name:'Important_Trendz.jpg',
          type: 'picture',
          size: 0.09
        }],
        totalSize: 4.7,
        members: [{
          username: 'test_google',
          firstname: 'Sergey',
          lastname: 'Brin',
          admin: false,
          uri: 'https://randomuser.me/api/portraits/med/men/19.jpg'
        },{
          username: 'test_fb',
          firstname: 'Priscilla',
          lastname: 'Chan',
          admin: false,
          uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },{
          username: 'svkmsr6',
          firstname: 'Souvik',
          lastname: 'Misra',
          admin: true,
          uri: 'https://randomuser.me/api/portraits/thumb/men/65.jpg'
        },{
          username: 'gunnar_isk',
          firstname: 'Aron',
          lastname: 'Gunnarsson',
          admin: false,
          uri: 'https://randomuser.me/api/portraits/med/men/88.jpg'
        },{
          username: 'aria_b',
          firstname: 'Ariana',
          lastname: 'Butcher',
          admin: false,
          uri:'https://randomuser.me/api/portraits/thumb/women/95.jpg'
        }],
    },
    'alphabet_dudes':{
        name:'Alphabet Dudes',
        membercount: 5,
        files: [{
          id: 882211,
          name:'All_Time_Metal_mashup.mp3',
          type: 'music',
          size: 0.59
        },{
          id: 231156,
          name:'Important_Coding_guidelines.pdf',
          type: 'document',
          size: 0.01
        },{
          id: 892215,
          name:'GDC2018.mp4',
          type: 'video',
          size: 0.5
        }],
        totalSize: 1.1,
        members: [{
          username: 'test_google',
          firstname: 'Sergey',
          lastname: 'Brin',
          admin: true,
          uri: 'https://randomuser.me/api/portraits/med/men/19.jpg'
        },{
          username: 'barney_kim',
          firstname: 'Barnaby',
          lastname: 'Kim',
          admin: false,
          uri: 'https://randomuser.me/api/portraits/men/90.jpg'
        },{
          username: 'svkmsr6',
          firstname: 'Souvik',
          lastname: 'Misra',
          admin: false,
          uri: 'https://randomuser.me/api/portraits/thumb/men/65.jpg'
        },{
          username: 'gunnar_isk',
          firstname: 'Aron',
          lastname: 'Gunnarsson',
          admin: false,
          uri: 'https://randomuser.me/api/portraits/med/men/88.jpg'
        },{
          username: 'aria_b',
          firstname: 'Ariana',
          lastname: 'Butcher',
          admin: false,
          uri:'https://randomuser.me/api/portraits/thumb/women/95.jpg'
        }],
    },
    'react_users':{
        name:'React Users',
        membercount: 5,
        files: [{
          id: 892215,
          name:'GDC2018.mp4',
          type: 'video',
          size: 0.5
        },{
          id: 231156,
          name:'Important_Coding_guidelines.pdf',
          type: 'document',
          size: 0.01
        },{
          id: 314228,
          name:'Analysis_Of_Data.pdf',
          type: 'document',
          size: 2.5
        },{
          id: 820841,
          name:'Important_Trendz.jpg',
          type: 'picture',
          size: 0.09
        }],
        totalSize: 3.1,
        members: [{
          username: 'baldo_arg',
          firstname: 'Juan Pablo',
          lastname: 'Baldovino',
          admin: false,
          uri: 'https://randomuser.me/api/portraits/men/64.jpg'
        },{
          username: 'test_fb',
          firstname: 'Priscilla',
          lastname: 'Chan',
          admin: true,
          uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg'
        },{
          username: 'svkmsr6',
          firstname: 'Souvik',
          lastname: 'Misra',
          admin: true,
          uri: 'https://randomuser.me/api/portraits/thumb/men/65.jpg'
        },{
          username: 'gunnar_isk',
          firstname: 'Aron',
          lastname: 'Gunnarsson',
          admin: false,
          uri: 'https://randomuser.me/api/portraits/med/men/88.jpg'
        },{
          username: 'aria_b',
          firstname: 'Ariana',
          lastname: 'Butcher',
          admin: false,
          uri:'https://randomuser.me/api/portraits/thumb/women/95.jpg'
        }],
    },
};

export default dummyGroupData;

export const getMockGroupData = () => dummyGroupData;