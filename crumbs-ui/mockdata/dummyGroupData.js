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
        },{
          username: 'test_fb',
          firstname: 'Priscilla',
          lastname: 'Chan',
          admin: false,
        },{
          username: 'svkmsr6',
          firstname: 'Souvik',
          lastname: 'Misra',
          admin: true,
        },{
          username: 'gunnar_isk',
          firstname: 'Aron',
          lastname: 'Gunnarsson',
          admin: false,
        },{
          username: 'aria_b',
          firstname: 'Ariana',
          lastname: 'Butcher',
          admin: false,
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
        },{
          username: 'barney_kim',
          firstname: 'Barnaby',
          lastname: 'Kim',
          admin: false,
        },{
          username: 'svkmsr6',
          firstname: 'Souvik',
          lastname: 'Misra',
          admin: false,
        },{
          username: 'gunnar_isk',
          firstname: 'Aron',
          lastname: 'Gunnarsson',
          admin: false,
        },{
          username: 'aria_b',
          firstname: 'Ariana',
          lastname: 'Butcher',
          admin: false,
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
        },{
          username: 'test_fb',
          firstname: 'Priscilla',
          lastname: 'Chan',
          admin: true,
        },{
          username: 'svkmsr6',
          firstname: 'Souvik',
          lastname: 'Misra',
          admin: true,
        },{
          username: 'gunnar_isk',
          firstname: 'Aron',
          lastname: 'Gunnarsson',
          admin: false,
        },{
          username: 'aria_b',
          firstname: 'Ariana',
          lastname: 'Butcher',
          admin: false,
        }],
    },
};

export default dummyGroupData;

export const getMockGroupData = () => dummyGroupData;