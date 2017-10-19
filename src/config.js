export default {
    endpoints: {
        url: (process.env.TAILS_API_URL) ? process.env.TAILS_API_URL : (process.env.NODE_ENV == 'production') ? 'http://tails-api-dev.gpd2yfmmj5.us-west-2.elasticbeanstalk.com' : 'http://tails-api-dev.gpd2yfmmj5.us-west-2.elasticbeanstalk.com',
        login: '/auth/signin',
        signup: '/auth/signup',
        forgot: '/api/auth/forgot_password',
        reset: '/api/auth/reset_password',
        userInfo: '/api/users/',
        changePass: '/api/users/',
        uerFood: '/api/user_diary_settings',
        getCountry: '/api/locations',
        listings: '/listings',
        profile: '/users',
        bids: '/bids',
        listings_animals: '/listing_animals',
        animal_image: '/animal_images'
    },
    stripe: {
        public_key: process.env.STRIPE_PUBLIC || ''
    },
    breeds: ['Dog', 'Horse', 'Cow', 'Goat', 'Cat', 'Bird']
}
