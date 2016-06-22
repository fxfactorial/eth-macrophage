import {EthereumNetwork} from './EthereumNetwork.js';
import {Home} from './Home.js';
import {mount} from 'react-mounter';
const NUM_GETH_INSTANCES = 3;

EthereumNetwork.createNode(true).then((bootnode) => {
  EthereumNetwork.setDefaultBootnode(bootnode);
  let createNodePromises = [];
  for(var i = 1; i < NUM_GETH_INSTANCES; i++) {
    let defer = new Promise((resolve, reject) => {
      EthereumNetwork.createNode(false).then( (newNode) => {
        newNode.addPeer().then(() => {
          resolve();
        });
      });
    });

    createNodePromises.push(defer);
  }

  Promise.all(createNodePromises).then( () => {
    mount(Home);
  });
});