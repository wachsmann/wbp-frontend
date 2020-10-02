import React from 'react';

import ConfigurationButtonControl from '../../MapControls/ConfigurationButtonControl';

import ConfigurationModal from './ConfigurationModal';

export default React.forwardRef((props, ref) => {
    
    const {t,generalRadius,handleGeneralRadius} = props
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
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
                handleClose={handleConfigurationOpen} />
        </div>
    );
})
