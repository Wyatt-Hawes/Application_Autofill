console.log('Hello from autofill');

const fileUrl = chrome.runtime.getURL('autofill_data.json');

// Get the autofill data
let autofill_data = {};
fetch(fileUrl)
  .then((response) => response.json()) // For JSON files
  .then((data) => {
    // Process the data
    console.log('Got:', data);
    autofill_data = data;
  })
  .catch((error) => {
    console.error('Error reading file:', error);
  });

// This gets run when the icon is clicked
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'begin_fill') {
    console.log('Received "begin_fill" message from Service Worker');
    begin_autofill();
  }
});

function begin_autofill() {
  // Get input fields
  let all_inputs = document.querySelectorAll('input');
  all_inputs.forEach((element) => {
    // Sanatize the ID
    let id = sanitize_id(element.id);
    console.log(element.id, ' --> ', id);

    // Get the field
    let field = get_field_for_id(id);
    console.log('Field: ', field, id.includes('first') && id.includes('name'));

    // Skip if no field
    if (!field) {
      return;
    }

    //Content for field
    let content = autofill_data[field];

    // Set the value of the field to the content
    element.value = content;
  });
}

// Returns ID but all lowercase & no special characters
function sanitize_id(id) {
  //stackoverflow.com/questions/9364400/remove-not-alphanumeric-characters-from-string
  https: return id.replace(/[^0-9a-z]/gi, '').toLowerCase();
}

function get_field_for_id(id) {
  switch (true) {
    case id.includes('first') && id.includes('name'): {
      return 'firstname';
    }
    case id.includes('last') && id.includes('name'): {
      return 'lastname';
    }
    case id.includes('middle') && id.includes('name'): {
      return 'middlename';
    }
    case id.includes('phone'): {
      return 'phonenumber';
    }
    case id.includes('email'): {
      return 'email';
    }
    case id.includes('veteran'): {
      return 'veteran';
    }
    case id.includes('gender'): {
      return 'gender';
    }
  }

  return '';
}

function check_box(element, id) {}
