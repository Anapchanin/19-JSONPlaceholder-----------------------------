// https://jsonplaceholder.typicode.com/

// пример запроса с лимитом https://jsonplaceholder.typicode.com/posts?_start=0&_limit=50

window.onload = async () => {
    let btnPost = document.querySelector('#btnPost')
    let btnComments = document.querySelector('#btnComments')
    let btnTodos = document.querySelector('#btnTodos')
    let textRequest = document.querySelector('#textRequest')
    let mainContainer = document.querySelector('#main-container')

   const getData = async (link) => {
    let formatJson = null;


    await fetch(link)
    .then((response) => response.json())
    .then((res) => (formatJson = res))
    .catch((error) => console.log("Непредвтдимая ошибка-" , error));
    return formatJson;
   };

   const claerMainContair =  () => {
     mainContainer.innerHTML = "";
   };

   const createPost =  (id, title, body) => {
      const div = document.createElement("div");
      div.className = "post"
      div.innerHTML = `
      <p id="postId">id: ${id}</p>
      <div id="postBody">
        <p id="postTitle">${title}</p>
        <p id="postMain">${body}</p>
      </div> 
      `;
      mainContainer.append(div);
   };

   const createComments =  (name,id,email,body ) => {
      const div = document.createElement ("div")
      div.className = "comment";
      div.innerHTML=`
      <div id="commentBodyText">
      <p id="commentName">${name}</p>
      <div id="commentInfo">
         <p id="commentId">id: ${id}</p>
         <p id="commentEmail">${email}</p>
      </div>
      </div>
      <div id="cimmentMain">${body}</div>
      `;
      mainContainer.append(div);
   };

   const createTodos = (id,title)=>{
      const div = document.createElement ("div")
      div.className = "Todos";
      div.innerHTML=`
      <p id="todosId">${id}</p>
      <p id="todosTitle">${title}</p>
      `
      mainContainer.append(div);
   };

    btnPost.addEventListener("click" ,async()=> {
     claerMainContair();
     textRequest.innerText = "Post Response";
     mainContainer.style.gridTrmplateColums = "550px 550px";
     
     const data = await getData(
        "https://jsonplaceholder.typicode.com/posts?_start=0&_limit=50"
     );

     data.map((post) => {
        createPost(post.id, post.title, post.body)
     })
    });

    btnComments.addEventListener("click" ,async()=>{
      claerMainContair();
      textRequest.innerText = "Comment Response";
      mainContainer.style.gridTemplateColumns = "repeat(4, 300px)";

      const data = await getData(
         "https://jsonplaceholder.typicode.com/comments?_start=0&_limit=52"
      );

      data.map((post) => {
         createComments(post.id, post.name, post.email , post.body)
      });
    });

    btnTodos.addEventListener("click", async()=>{
      claerMainContair();
      textRequest.innerText = "Todos Response";
      mainContainer.style.gridTemplateColumns = "800px"
    

    const data = await getData(
         "https://jsonplaceholder.typicode.com/todos?_start=0&_limit=50"
      )

      data.map((post) => {
         createTodos(post.id, post.title)
      })
   })
}