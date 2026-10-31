export const stores = [

    {
        id: "maruchan-auto",
        name: "Maruchan",
        location: "auto",
        description: "Rapido y Practico",
        image: `${import.meta.env.BASE_URL}images/stores/maruchan.png`,

        schedule: {
            monday: ["19:30", "23:59"],
            tuesday: ["19:30", "23:59"],
            wednesday: ["19:30", "23:59"],
            thursday: ["19:30", "23:59"],
            friday: ["19:30", "23:59"],
            saturday: ["19:30", "23:59"],
            sunday: null
        }
    },

    {
        id: "tortas-misi",
        name: "Tortas Misi",
        location: "cerca-auto",
        description: "Tortas",
        image: `${import.meta.env.BASE_URL}images/stores/Tortas-misi.jpeg`,

        schedule: {
            monday: ["19:30", "20:20"],
            tuesday: ["19:30", "20:20"],
            wednesday: ["19:30", "20:20"],
            thursday: null,
            friday: ["19:30", "20:20"],
            saturday: ["19:30", "20:20"],
            sunday: ["19:30", "20:20"]
        }
    },

    {
        id: "burgers-cordova",
        name: "Burger's Cordova",
        location: "cerca-auto",
        description: "Tacos, Hamburguesas y mas",
        image: `${import.meta.env.BASE_URL}images/stores/burger_cordova.jpeg`,

        schedule: {
            monday: ["19:30", "22:20"],
            tuesday: ["19:30", "22:20"],
            wednesday: ["19:30", "22:20"],
            thursday: ["19:30", "22:20"],
            friday: ["19:30", "22:20"],
            saturday: ["19:30", "22:20"],
            sunday: ["19:30", "22:20"]
        }
    },

    {
        id: "sanchez-tacos-mex",
        name: "Sanchez Tacos Mex",
        location: "cerca-auto",
        description: " ",
        image: `${import.meta.env.BASE_URL}images/stores/sanchez_tacos_mex.jpeg`,

        schedule: {
            monday: ["19:30", "22:20"],
            tuesday: ["19:30", "22:20"],
            wednesday: ["19:30", "22:20"],
            thursday: ["19:30", "22:20"],
            friday: ["19:30", "22:20"],
            saturday: ["19:30", "22:20"],
            sunday: ["19:30", "22:20"]
        }
    },


    {
        id: "tortas-salvajes",
        name: "Tortas Salvajes",
        location: "meche",
        description: "Tortas, hamburguesas y más.",
        image: `${import.meta.env.BASE_URL}images/stores/tortas-salvajes.jpeg`,

        schedule: {
            monday: ["19:30", "22:20"],
            tuesday: ["19:30", "22:20"],
            wednesday: ["19:30", "22:20"],
            thursday: ["19:30", "22:20"],
            friday: ["19:30", "22:20"],
            saturday: ["19:30", "22:20"],
            sunday: null
        }
    },

    {
        id: "tacos-rosy",
        name: "Tacos Rosy",
        location: "meche",
        description: "Comida preparada.",
        image: `${import.meta.env.BASE_URL}images/stores/tacos-rosy.png`,

        schedule: {
            monday: ["19:30", "22:20"],
            tuesday: ["19:30", "22:20"],
            wednesday: ["19:30", "22:20"],
            thursday: ["19:30", "22:20"],
            friday: ["19:30", "22:20"],
            saturday: ["19:30", "22:20"],
            sunday: null
        }
    },


    {
        id: "pastor-lopez",
        name: "Pastor López",
        location: "meche",
        description: "Tacos y Tortas",
        image: `${import.meta.env.BASE_URL}images/stores/pastor-lopez.jpeg`,

        schedule: {
            monday: ["19:30", "22:20"],
            tuesday: ["19:30", "22:20"],
            wednesday: ["19:30", "22:20"],
            thursday: ["19:30", "22:20"],
            friday: ["19:30", "22:20"],
            saturday: null,
            sunday: ["19:30", "22:20"]
        }
    }
];