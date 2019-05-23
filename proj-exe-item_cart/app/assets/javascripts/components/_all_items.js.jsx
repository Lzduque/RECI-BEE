// First, let’s start with listing all the items. Listing them will include making a request to the server to fetch all the items into our component using an AJAX request. We need to do it when the component gets rendered into the DOM. React has several built-in methods that handle different events during a component’s lifespan. There are methods that execute before and after component mounts into the DOM or before and after it dismounts from the DOM. In this case, we need a method that will handle the AJAX request when the component mounts. We’ll use componentDidMount(), which is called right after the component is mounted. You can find out about other component methods and how to use them in React’s documentation.
// Before we fetch information from the server, we need to know how data is stored in the component. When the component is mounted, its data has to be initialized. This is done by the getInitialState() method.

var AllItems = React.createClass({
  // Now we’ll just pass the reference of the function in the parent component to the child component via props :
  handleDelete() {
    this.props.handleDelete();
  },

  onUpdate(item) {
    this.props.onUpdate(item);
  },

  // The map method is similar to the each method in the .erb templates. It iterates through the array of items and displays the items’ attributes using bracket notation. The brackets are equivalent to Rails’ <%= => tags. They’re used to inject the item attributes into the html, making it dynamic. It eventually returns the items variable, which now is a DOM element with item attributes wrapped in html elements.
  // It all looks good, but how do we know which item we’re deleting? We’re going to use the bind() method. The bind() method will bind the id of the item to this, causing the id to send as an argument.
  render() {
    var items= this.props.items.map((item) => {
        return (
          <div key={item.id}>
          <Item item={item}
                 handleDelete={this.handleDelete.bind(this, item.id)}
                 handleUpdate={this.onUpdate}/>
          </div>
        )
    });

    return(
        <div>
            {items}
        </div>
    )
  }
});
