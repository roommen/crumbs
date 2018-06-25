const dummyUserData = {
    'test_google':{
        firstname : 'Sergey',
        lastname : 'Brin',
        groups : {
            'global_dev':{
                name:'Global Developers',
                membercount: 5,
                contribution: 1.2,
            },
            'alphabet_dudes':{
                name:'Alphabet Dudes',
                membercount: 5,
                contribution: 0.8,
            }
        }
    },
    'test_fb':{
        firstname : 'Priscilla',
        lastname : 'Chan',
        groups : {
            'global_dev':{
                name:'Global Developers',
                membercount: 5,
                contribution: 0.2,
            },
            'react_users':{
                name:'React Users',
                membercount: 5,
                contribution: 1.8,
            }
        }
    }
};

export default dummyUserData;

export const getMockData = () => dummyUserData;