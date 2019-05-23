// What’s needed to create a new item? We must create two input fields and send them to the server via POST request. When the new item is created, we have to reload our list of items so that they include the newly created one.
// Everything looks familiar, except for the ref attribute. The ref attribute is used to reference the element in the component. Its function is similar to the name attribute in AngularJS. Instead of finding elements by id or by class, we do it by ref. In this particular case, the ref will be used to get the value of the text field and send it to the server.
// Once we have this, when we click the button the component will look for the handleClick() function. We must define it in the JavaScript file.

var NewItem= React.createClass({
  handleClick() {
    var name    = this.refs.name.value;
    var description = this.refs.description.value;

    // Here you can see how the refs attribute is used in order to get the value out of the input field. Instead of sending the values to the console, we’re going to send them to the server. Here’s how this will happen:
    // We send a POST request to the URL endpoint for the items using $.ajax . The response contains an object with the item’s name and description. Its callback prints the response from the server in the console. Try it out!
    $.ajax({
      url: "/api/v1/items",
      type: "POST",
      data: { item: { name: name, description: description } },
      success: (item) => {
        this.props.handleSubmit(item);
      }
    });
  },

  render() {
      return (
          <div>

              <input ref='name' placeholder='Enter the name of the item' />
              <input ref='description' placeholder='Enter a description' />
                <button onClick={this.handleClick}>Submit</button>
            </div>
            )

      )
  }
});
