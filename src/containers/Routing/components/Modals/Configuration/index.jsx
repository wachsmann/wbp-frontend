import React from 'react';

import ConfigurationButtonControl from '../../MapControls/ConfigurationButtonControl';

import ConfigurationModal from './ConfigurationModal';

export default React.forwardRef((props, ref) => {
    
    const {t,generalRadius,handleGeneralRadius,applyGeneralRadius} = props
    
    const handleClose = () => {
      debugger
        applyGeneralRadius()
        setConfigurationOpen(false);
    };
    const [openConfiguration, setConfigurationOpen] = React.useState(false);
    const [openSaveInfo, setSaveInfo] = React.useState(false);

    const handleConfigurationOpen = () => {
      setConfigurationOpen(!openConfiguration);
    
    };
    const handleSaveInfoOpen = () => {
      setSaveInfo(!openSaveInfo);
    };
   
    return (
        <div ref={ref}>
            <ConfigurationButtonControl handleClick={handleConfigurationOpen} />
            <ConfigurationModal
                t={t} open={openConfiguration}
                generalRadius={generalRadius}
                handleGeneralRadius={handleGeneralRadius}
                handleClose={handleClose} />
        </div>
    );
})
