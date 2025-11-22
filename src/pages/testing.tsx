import DotGrid from '../components/react-bits/dot-grid';

export function Testing() {
   return (
      <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
         <DotGrid
            dotSize={5}
            gap={15}
            baseColor="#222222"
            activeColor="#2a9dfa"
            proximity={160}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
            style={{ position: 'absolute' ,zIndex: -1}}
         />
         <h1>Testing</h1>
      </div>
   )
}
