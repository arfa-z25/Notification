    // Function to request notification permission
    function requestNotificationPermission() {
        if ("Notification" in window) {
          Notification.requestPermission().then(function(permission) {
            if (permission !== "granted") {
              alert("Please allow notifications access!!");
              location.reload();
            }
          });
        } else {
          alert("This browser does not support notifications.");
        }
      }
      
      var tasks = []; // Array to store tasks and their timeout IDs
      
      function scheduleReminder(title, date) {
        var scheduledTime = new Date(date);
        var currentTime = new Date();
        var timeDifference = scheduledTime - currentTime;
      
        if (timeDifference > 0 ) {
          var timeoutId = setTimeout(function() {
            var notification = new Notification(title, {
              body: title,
              requireInteraction: true
            });
          }, timeDifference);
          return timeoutId; // Return the timeout ID
        } else {
          alert("The scheduled time is in the past.");
        }
      }
      
      const notification_Icon = document.getElementById('request-permission-button');
      const bell = document.getElementById('notification-bell');
      notification_Icon.addEventListener('click', function()
      {
        requestNotificationPermission();
        bell.src = 'bell (3).png';
      
      
      });
      
      
      
      const input = document.getElementById('task-input'); 
      const date = document.getElementById('date-input');
      const img = document.getElementById('add-task-button');
      const container = document.getElementById('written-input');
      
      
      img.addEventListener('click', function() {
        var text = input.value;
        const dateTime = date.value;
      
        if (text.length > 0 && dateTime) {
          // Create a new list item
          const anotherdiv = document.createElement('div');
          anotherdiv.className = "user-input";
      
          const line = document.createElement('input');
          line.type = 'text';
          line.value = text;
          line.className = 'user_tasks';
          line.readOnly = true;
          localStorage.setItem("Tasks" , line.text);
         
      
          var date_Input = document.createElement('input') ; 
          date_Input.type = 'text';
          date_Input.value = date.value ; 
          date_Input.readOnly = true ;
          date_Input.className = 'user_date';
          
      
          const box = document.createElement('input');
          box.type = 'checkbox';
          box.checked = false;
          
      
          const editImage = document.createElement('img');
          editImage.src = 'icons8-edit-50.png';
          editImage.className = 'Image editicon';
         
      
          const deleteImage = document.createElement('img');
          deleteImage.src = 'icons8-remove-64.png';
          deleteImage.className = 'Image';
          deleteImage.id = 'Deletion';
        
      
          anotherdiv.appendChild(box);
          anotherdiv.appendChild(line);
          anotherdiv.appendChild(date_Input);
          anotherdiv.appendChild(editImage);
          anotherdiv.appendChild(deleteImage);
      
          container.appendChild(anotherdiv);
          container.style.visibility = 'visible';
      
      
          // Clear the input fields
          input.value = "";
          date.value = "";
          box.checked = false;
      
       
         
         
      // Edit button event
        editImage.addEventListener('click', function() {
        line.readOnly = false;
        line.focus();
        date_Input.readOnly = false ; 
        date_Input.focus();
        
       });
       
      
       // ENTER BUTTON ON INPUT FIELD...
      line.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          line.readOnly = true;
          line.style.border = 'none';
          line.style.outline = 'none' ; 
          text = line.value; // Update the text variable with the new value
      
          // Find the task in the tasks array
          const taskIndex = tasks.findIndex(task => task.element === anotherdiv);
          if (taskIndex > -1) {
          //Clear the existing timeout
          clearTimeout(tasks[taskIndex].timeoutId);
            
          // Schedule a new reminder with the updated text
          const timeoutId = scheduleReminder(text, dateTime);
            
            // Update the task's text and timeout ID in the array
           tasks[taskIndex].text = text;
           tasks[taskIndex].timeoutId = timeoutId;
          } 
          
        }
      });
      
           // Schedule the reminder and store the task with its timeout ID
            const timeoutId = scheduleReminder(text, dateTime);
           tasks.push({ text, timeoutId, element: anotherdiv });
      
       
            // Delete button event
            deleteImage.addEventListener('click', function() {
            // Find the task in the tasks array and clear the timeout
            const taskIndex = tasks.findIndex(task => task.element === anotherdiv);
            if (taskIndex > -1) {
              clearTimeout(tasks[taskIndex].timeoutId);
              tasks.splice(taskIndex, 1); // Remove the task from the array
            }
            anotherdiv.remove();
           });
      
        
        
           } else {
           window.alert("Enter input and date!!");
          }
       
      });
      