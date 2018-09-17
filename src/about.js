import React from 'react';

class About extends React.Component {
  render(){
    return(
      <div className="about static">
        <h1> About </h1>
        <p>
          This is an example application, that was made to show the ways of getting the information from different sources, filtering it and visualising data using a single-page application.
        </p>
        <p>
          All the data was provided by <a target="_blank" href="https://openchargemap.org/"> Open Charge Map project </a>
        </p>
        <p>
          Map and components - <a target="_blank" href="https://github.com/tomchentw/react-google-maps"> react-google-maps </a> and <a target="_blank" href="https://google.com">Google</a>
        </p>
        <p>
          Development - <a target="_blank" href="https://diatomenterprises.com"> Diatom Enterprises </a> by <a target="_blank" href="https://github.com/AKovtunov"> Alexandr Kovtunov </a>
        </p>
        <p>
          Hosting - <a target="_blank" href="https://heroku.com">Heroku</a>
        </p>
      </div>
    )
  }
}

export default About;
