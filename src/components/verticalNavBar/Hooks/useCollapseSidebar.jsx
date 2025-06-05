import { useProSidebar } from 'react-pro-sidebar';

function useCollapseSidebar() {
  const { collapseSidebar } = useProSidebar();
  return collapseSidebar ;
}

export default useCollapseSidebar;