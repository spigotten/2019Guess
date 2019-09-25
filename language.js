module.exports = (function(){

    //i18n l10n
    const DEFAULT_LANGUAGE = "en";

    const TEXTS = {
        en:{
        NOT_STARTED: "Game not started. Go to /start",
        WIN: "You guessed correctly ! Game over.",
        LOWER: "The number is bigger, try again!",
        BIGGER: "The number is lower, try again!",
        OVER: "The game is already over, too bad."
    }
    ,
    no:{
        NOT_STARTED: "IKKE noe pågående spill. Gå til /start",
        WIN: "You guessed correctly ! Game over.",
        LOWER: "The number is bigger, try again!",
        BIGGER: "The number is lower, try again!",
        OVER: "The game is already over, too bad."
    }
    ,
    fr:{
        NOT_STARTED: "La partie n'a pas commencé. Allez a /start",
        WIN: "Vous avez deviné correctement! Fin de la partie.",
        LOWER: "Le nombre est plus grand, reessaie!",
        BIGGER: "Le nombre est plus petit, reessaie!",
        OVER: "La partie est deja terminee, dommage."
    }
    };

    return function getClientLang(req,res,next){

        let language = req.headers["accept-language"] || DEFAULT_LANGUAGE;

        language = language.split(",")[0].split(";")[0]; //["fr;q0.9", "en;0.8"] --> ["fr","q09"]

        let languages = Object.keys(TEXTS); // ["en","no"]
        if (!languages.indexOf(language)){
            language = DEFAULT_LANGUAGE
        }

        //------
        req.language = function(key){
            
            let value = TEXTS[language][key];
            if(!value){
                value = TEXTS[DEFAULT_LANGUAGE][key];
                console.error(`Person that wrote the ${language} made a mistake with key ${key}`)
            }
            
            return value
        };
        //------

        next();
    }
});