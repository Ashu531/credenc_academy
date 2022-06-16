import mixpanel from 'mixpanel-browser';
mixpanel.init(MIXPANEL_TOKEN);

// let env_check = process.env.NODE_ENV === 'production';

let actions = {
  identify: (id, props) => {
    mixpanel.identify(id, props);
  },
  alias: (id) => {
    mixpanel.alias(id);
  },
  track: (name, props) => {
    try {
      mixpanel.track(name, props);
    } catch (err) {
      console.log(err, "ERROR")
    }
  },
  people: {
    set: (props) => {
      mixpanel.people.set(props);
    },
  },
};

export let Mixpanel = actions;
