function loadState() {
    try {
      const serializedState = localStorage.getItem( 'reactjs-challenge' );
      if( serializedState === null ) {
        return undefined
      }
      return JSON.parse( serializedState )
    } catch( err ) {
      return undefined
    }
  }
  
  function saveState( state ) {
    try {
      const stateToPersist = { user: state.user };
      const serializedState = JSON.stringify( stateToPersist );
      localStorage.setItem( 'reactjs-challenge', serializedState );
    } catch( err ) {
    }
  }
  
  export {loadState, saveState};
  