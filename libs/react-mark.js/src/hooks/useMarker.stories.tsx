import { useCallback } from 'react';
import { useMarker } from './useMarker';

const Story = {
  title: 'Stories/Hooks/useMarker',
};

const Template = () => {
  const { marker, markerRef } = useMarker();

  const handleClickMark = useCallback(() => {
    marker.mark('Lorem Ipsum');
  }, [marker]);

  const handleClickUnMark = useCallback(() => {
    marker.unmark();
  }, [marker]);

  return (
    <div>
      <div ref={markerRef}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
        dolorum sit, commodi dolor, aperiam, veritatis deleniti est et possimus
        rem error animi omnis reiciendis vero magnam ipsa explicabo laudantium
        eum.
      </div>
      <div style={{ display: 'flex', gap: 10 }}>
        <button type="button" onClick={handleClickMark}>
          Mark
        </button>
        <button type="button" onClick={handleClickUnMark}>
          Unmark
        </button>
      </div>
    </div>
  );
};

export const useMarkerHook = Template.bind({});
useMarkerHook.args = {};

export default Story;
