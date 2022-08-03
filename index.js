const postTitle = document.getElementById( "post-title" )
const postBody = document.getElementById("post-body")
function renderPosts() {
    let html = ""
    for (let post of postsArray) {
        html += `
            <h3>${post.title}</h3>
            <p>${post.body}</p>
            <hr />
        `
    }
    document.getElementById("blog-list").innerHTML = html
}

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then(res => res.json())
    .then(data => {
        postsArray = data.slice(0, 5)
        renderPosts()
    })

document.getElementById("new-post").addEventListener("submit", function(e) {
    e.preventDefault()
    const data = {
        title:  postTitle.value,
        body:  postBody.value
    }
    
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }
    
    fetch( "https://apis.scrimba.com/jsonplaceholder/posts", options )
        .then( res => {
            if ( res.ok ) {
                console.log("Data added successfully")
                postTitle.value = ""
                postBody.value = ""  
            }
            else {
                console.log("Data Failed to Add")
            }
            return res
        })
        .then( res => res.json() )
        .then(post => {
            postsArray.unshift(post)
            renderPosts()
        })
})