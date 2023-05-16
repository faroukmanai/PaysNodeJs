//7 import
import Accueil from "./views/Accueil.js"
import Recherche from "./views/Recherche.js"
import Liste from "./views/Liste.js"

// import PostView from "./views/PostView.js"
// console.log('test')
//10 Regex
const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$")


//11 Get Params
const getParams = match => {
    const values = match.result.slice(1)
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1])

    // console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)));
    // return {};

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
        }));
}
//1 router
const router = async() => {
    //10.1 test regex
    // console.log(pathToRegex("/post-view/:id"))
    const routes = [
        {path : "/", view: Accueil},
        {path : "/recherche", view: Recherche},
        {path : "/liste", view: Liste},
        // {path: "/post-view/:id",view: PostView}
    ]
//2 match function 
    const potentialMatches = routes.map( route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path))
        }
    })
    //  console.log(potentialMatches)
//3 find view
    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null)
    if(!match){
        match = {
            route: routes[0],
            result: [location.pathname]
        }
    }
    // console.log(match.route.view())
    //8 render view
    const view = new match.route.view(getParams(match));
    // console.log(getParams(match))
    document.querySelector("#app").innerHTML = await view.getHtml()
    await view.afterRender();

}

// 9 use nav back button
window.addEventListener("popstate", router)

// 5 navigate state
const navigateTo = url => {
    history.pushState(null, null, url)
    router()
}

//4 executer la route
document.addEventListener("DOMContentLoaded", () =>{
    document.body.addEventListener('click', e => {
        if(e.target.matches("[data-link]")){
            e.preventDefault()
            navigateTo(e.target.href)
        }
    })
    router()
} )
