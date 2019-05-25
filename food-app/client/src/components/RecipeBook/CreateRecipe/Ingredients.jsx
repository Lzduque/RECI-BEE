import React, { Component } from 'react';

// class Ingredients extends Component {
//   constructor(props) {
//     super(props);

//   }

//   render() {
//     return (
//       <div className="container-1-box">
//         <h3>Ingridients</h3>
//           <p>autosuggest ingridients here!</p>
//           <p>Ingridient name(autossugest - only ingridients that we have - error message) - qt.(input field that acepts only integers) - unit(hardcoded, will appear when the ingridient is choosen)</p>
//           <p>automatically another line like this appears to add another ingridient</p>
//           <input name="ingredients"
//                   type="text"
//                   value={this.state.newRecipe.ingredients}
//                   onChange={this.handleChange('ingredients')} />
//           <input name="ingredients"
//                   type="number"
//                   value={this.state.newRecipe.servings}
//                   onChange={this.handleChange('servings')} />
//       </div>
//     )
//   }
// }

// export default Ingredients;


class Ingredients extends Component {
  constructor(props) {
    super(props);

    this.state = {
      testSelectedOption: 'Option 1',
      testAnotherSelectedOption: 'Another Option 2',
      dynamicValues: [],
      someMoreDynamicValues: []
    }
  }

  updateInputValue = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  updateDynamicValue = (id, collectionName, event) => {
    event.persist();
    this.setState((prevState) => ({
      [collectionName]: prevState[collectionName].map(item => {
        return item.id !== id ? item : Object.assign({}, item, {
          [event.target.name]: event.target.value
        });
      })
    }));
  };

  addDynamicItem = (collectionName) => {
    this.setState((prevState) => ({
      [collectionName]: prevState[collectionName].concat([{
        id: `${collectionName}-value-`,
        value: ''
      }])
    }));
  };

  removeDynamicItem = (id, collectionName, event) => {
    this.setState((prevState) => {
      let indexToRemove = prevState[collectionName].findIndex(x => x.id === id);
      return {
        [collectionName]: [...prevState[collectionName].slice(0, indexToRemove), ...prevState[collectionName].slice(indexToRemove + 1)]
      }
    });
  };

  render() {
    return (
      <div>
        <h2>Complex Vanilla React Form</h2>
        <form>
          <div className="form-group">
          {
            this.state.dynamicValues.map((item, i) => (
              <div>
                <div className="form-group" key={item.id}>
                  <label>Ingredient {i + 1} :</label>
                  <div className="input-group">
                    <input className="form-control" name="value" value={item.value} onChange={this.updateDynamicValue.bind(this, item.id, 'dynamicValues')}/>
                   <span className="input-group-btn">
                      <button className="btn btn-danger" onClick={this.removeDynamicItem.bind(this, item.id, 'dynamicValues')}>Remove</button>
                    </span>
                  </div>
                </div>
              </div>
            ))
          }
          <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={this.addDynamicItem.bind(this, 'dynamicValues')}>Add Ingredient</button>
          </div>
          </div>
          <button type="submit" className="btn btn-success">Submit</button>
        </form>
        <pre style={{marginTop: '1em'}}>{JSON.stringify(this.state, null, '\t')}</pre>
      </div>
    );
  }
}

export default Ingredients;
