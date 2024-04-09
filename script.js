//create a note class
class Note {
  constructor(id, title, text){
  this.id = id; //Unique Identifier
  this.title = titel; //Title of the note
  this.text = text; //Text of the Note
  }
}

// Define an App class to manage the notes
class App{
  constructor() {
    this.notes = []; //Initiliaze oan empty array to store the notes

    //Select the form with the class active-form and store reference to it in this this.$activeForm
    this.$activeForm = document.querySelector(".active-form");
    this.$inactiveForm = document.querySelector(".inactive-form")

    this.$noteTitle = document.querySelector("#note-title");
    this.$noteText = document.querySelector("#note-text");

    this.$notes = document.querySelector(".notes");  
    this.$form = document.querySelector("#form");
    this.$modal = document.querySelector(".modal");
    


     // Call the event listener
     this.addEventlisteners();
     // Calls the method to display the notes 
    this.displayNotes();
  }

  // Method to add event listeneres to the application
  addEventlisteners(){
    // Add a click event listener to the body of the document
    document.body.addEventlistener("click", (event) => {
      //When a click event occurs, call the handleFormClick method
      this.handleFormClick(event);
      this.openModal(event);
    })
    // Adding the close 'button' functionality
    this.$form.addEventlistener("submit", (event) => {
      event.preventDefault(); //Prevents the page from refreshing
      const title = this.$noteTitle.value;
      const text =this.$noteText.value;
      this.addNotes({ title, text})
      this.closeActiveForm();
    }) 
  }


//Method to handle the form click
  handleFormClick(event){
  const isActiveFormClickedOn = this.$activeForm.contains(event.target);
  const isInactiveFormClickedOn = this.$inactiveForm.contains(event.target);

  const title = this.$noteTitle.value;
  const text =this.$noteText.value;

  this.addNotes({ title, text})
  

  if(isInactiveFormClickedOn) {
    //Calling the function to open the active form
   this.openActiveForm();
   }
   else if(!isInactiveFormClickedOn && !isActiveFormClickedOn) {
    this.addNotes({ title, text});
    //Clalling the function to close the active form
   this.closeActiveForm();
   }
  }
//Displays the active form
  openActiveForm(){
    this.$activeForm.style.display = "block";
    this.$inactiveForm.style.display = "none";
    this.$noteText.focus();
  }
//Closes the active form
  closeActiveForm(){
    this.$activeForm.style.display = "none";
    this.$inactiveForm.style.display = "block";
    this.$noteTitle.value = "";
    this.$noteText.value = "";
  }

  openModal(event){
    if(event.target.closest("note")) {
      this.$modal.classList.add("open-modal");
    }
  }
 
  // Method to add an new note to the  notes array
addNotes({title, text}){
  if(text != ""){
    const newNote = new Note(cuid(), title, text) // Create a new instance of a notes
    this.notes = [...this.notes, newNote]; //Add the new note to the notes array 
  
      // Calls the method to display the notes 
      this.displayNotes();

    }
 
  }

  //Method to edit an existing note by its id
  editNote(id, {title, text}){
    this.notes = this.notes.map(note => {
      if(note.id === id){ //Compare the id
        note.title = title;// Update the notes title
        note.text = text;// Update the notes text
      }
      return note;//Return the updated note
    })
  }
  // Method to delete the notes
  deleteNote(id){
    this.notes = this.notes.filter(note => note.id !== id); // Remove note from the array
  }

  handleMouseOverNote(element){
    const $note = document.querySelector('# + element.id');
    const $checkNote = $note.querySelector(".check-circle");
    const $noteFooter = $note.querySelector(".note-footer");
    $checkNote.style.visibility = "visible";
    $noteFooter.style.visibility = "visible";
  }
  handleMouseOverNote(element){
    const $note = document.querySelector('# + element.id');
    const $checkNote = $note.querySelector(".check-circle");
    const $noteFooter = $note.querySelector(".note-footer");
    $checkNote.style.visibility = "hidden";
    $noteFooter.style.visibility = "hidden";
  }

  //Method to display the notes in the console
  displayNotes() {
    this.$notes.innerHTML = this.notes.map((note) => 
    `
    <div class="note" id="${note.id}" onmouseover ="app/handleMouseOverNote(this)">
      <span class="material-symbols-outlined check-circle">check_circle</span>
      <div class="note-title">${note.title}</div>
      <div class="note-text">${note.text}</div>
      <div class="note-footer">
      <div class="tooltip">
      <span class="material-symbols-outlined hover small-icon">add_alert</span>
      <span class="tooltip-text">Remind me</span>
      </div>
      <div class="tooltip">
      <span class="material-symbols-outlined hover small-icon">person_add</span>
      <span class="tooltip-text">Collaborator</span>
      </div>
      <div class="tooltip">
      <span class="material-symbols-outlined hover small-icon">palette</span>
      <span class="tooltip-text">Change Color</span>
      </div>
      <div class="tooltip">
      <span class="material-symbols-outlined hover small-icon">image</span>
      <span class="tooltip-text">Add Image</span>
      </div>
      <div class="tooltip">
      <span class="material-symbols-outlined hover small-icon">archive</span>
      <span class="tooltip-text">Archive</span>
      </div>
      <div class="tooltip">
      <span class="material-symbols-outlined hover small-icon">more_vert</span >
      <span class="tooltip-text">More</span>
      </div>
      <div class="tooltip">
      <span class="material-symbols-outlined hover small-icon">undo</span>
      <span class="tooltip-text">Undo</span>
      </div>
      <div class="tooltip">
      <span class="material-symbols-outlined hover small-icon">redo</span>
      <span class="tooltip-text">Redo</span>
      </div>
      </div>
      </div>
    `
    ) .join(" "); //Display each note details
  }
}

// Initiliaze a new App instance
const app = new App();








