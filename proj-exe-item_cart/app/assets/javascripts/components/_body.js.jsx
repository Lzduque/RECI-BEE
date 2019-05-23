// We must add the <AllItems /> and <NewItem /> components into the body component, just like we included. In the <Body /> component, we’ll include the rest of the nested components, respectively:

var Body = React.createClass({
  getInitialState() {
    return { items: [] }
  },

  // Now, we need to get the data from the server and assign it to the items object. Here’s how we do it:
  // We use the getJSON method with the URL of the items.json as an argument, and we use the setState function of the component to put the response into the items object.
  componentDidMount() {
    $.getJSON('/api/v1/items.json', (response) => { this.setState({ items: response }) });
  },

  // We just need to add the new item to the items array instead of logging it to the console.
  handleSubmit(item) {
    var newState = this.state.items.concat(item);
    this.setState({ items: newState })
  },

  // Second, we’re going to pass the reference to the function up to the parent <Body /> component, where the update of the list will be handled when the delete button is clicked.
  // Now that we can send the id as an argument, we’re done with the second step. The third thing we need to do is to make an AJAX call to delete the item from the database.
  handleDelete(id) {
    $.ajax({
        url: `/api/v1/items/${id}`,
        type: 'DELETE',
        success:() => {
          this.removeItemClient(id);
        }
    });
  },

  handleUpdate(item) {
    $.ajax({
            url: `/api/v1/items/${item.id}`,
            type: 'PUT',
            data: { item: item },
            success: () => {
                this.updateItems(item);
                // callback to swap objects
            }
        }
    )
  },

  updateItems(item) {
    var items = this.state.items.filter((i) => { return i.id != item.id });
    items.push(item);

    this.setState({items: items });
  },

  // Everything works, but we’re encountering the same problem we had with adding a new item; the page has to be restarted in order to see the results. Our last step is to change that; we will update the state by removing the item from the array of items upon successful deletion from the database.
  removeItemClient(id) {
    var newItems = this.state.items.filter((item) => {
        return item.id != id;
    });

    this.setState({ items: newItems });
  },

  render() {
    return (
      <div>
        <NewItem handleSubmit={this.handleSubmit}/>
        <AllItems  items={this.state.items}  handleDelete={this.handleDelete} onUpdate={this.handleUpdate}/>
      </div>
    );
  }
});
