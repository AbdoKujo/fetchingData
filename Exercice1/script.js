document.addEventListener('DOMContentLoaded', () =>{
    // Get reference
        const form = document.querySelector('form');
        const input = document.querySelector('input');
        const list = document.querySelector('list');
    
    //fetching data    
        fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
            .then(response => response.json())
            .then(tasks =>{
                tasks.forEach(task=> Add(task));
            });
    //form
        form.addEventListner('sumbit', (e)=>{
            e.preventDefault();
        })
    }
)