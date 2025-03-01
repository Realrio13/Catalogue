import { MarkerType } from '@vue-flow/core'

export const initialNodes = [
  {
    id: '1',
    type: 'special',    
    data: { 
      label: 'Taskmaster',
    },
    style: {
      backgroundColor: 'lightgreen',
      borderColor: 'darkgreen',
    },
    position: { x: 400, y: 0 },
    class: 'light',
    dimensions:{ width: 100, height:100}
  },
  {
    id: '2',
    type: 'special',
    data: { 
      label: 'Pilot lines', 
    },
    props:{
      label: 'Toooskmaster',
    },
    style: {
      backgroundColor: 'lightgreen',
      borderColor: 'darkgreen',
    },
    position: { x: 600, y: 140 },
    class: 'light',
  },
  {
    id: '3',
    type: 'special',
    data: { 
        label: 'Data digitization', 
    },
    props:{
      label: 'Toooskmaster',
    },
    style: {
        backgroundColor: 'lightgreen',
        borderColor: 'darkblue',
    },
    position: { x: 200, y: 200 },
    class: 'light',
  },
  {
    id: '4',
    type: 'special',
    data: { 
        label: 'At dawn...', 
    },
    style: {
        backgroundColor: 'yellow',
        borderColor: 'darkgreen',
    },
    position: { x: 400, y: 200 },
    class: 'light',
  },
  {
    id: '5',
    type: 'special',
    data: { 
        label: 'Structural modernization', 
    },
    style: {
        backgroundColor: 'lightgreen',
        borderColor: 'tomato',
    },
    position: { x: 800, y: 200 },
    class: 'light',
  },
  {
    id: '6',
    type: 'special',
    data: { 
        label: 'Robot resources', 
    },
    style: {
        backgroundColor: 'lightgreen',
        borderColor: 'orange',
    },
    position: { x: 0, y: 300 },
    class: 'light',
  },
  {
    id: '7',
    type: 'special',
    data: { 
        label: 'Security breach', 
    },
    style: {
        backgroundColor: 'lightgreen',
        borderColor: 'black',
    },
    position: { x: 400, y: 300 },
    class: 'light',
  },
  {
    id: '8',
    type: 'special',
    data: { 
        label: 'Resistance to change', 
    },
    style: {
        backgroundColor: 'yellow',
        borderColor: 'darkgreen',
    },
    position: { x: 600, y: 330 },
    class: 'light',
  },
  {
    id: '9',
    type: 'special',
    data: { 
        label: 'Training montage', 
    },
    style: {
        backgroundColor: 'lightgreen',
        borderColor: 'tomato',
    },
    position: { x: 1000, y: 300 },
    class: 'light',
  },
  {
    id: '10',
    type: 'special',
    data: { 
        label: 'Hybrid work program', 
    },
    style: {
        backgroundColor: 'lightgreen',
        borderColor: 'darkred',
    },
    position: { x: 1200, y: 300 },
    class: 'light',
  },
  {
    id: '11',
    type: 'special',
    data: { 
        label: 'Data storage inadequacy', 
    },
    style: {
        backgroundColor: 'yellow',
        borderColor: 'darkblue',
    },
    position: { x: 200, y: 400 },
    class: 'light',
  },
  {
    id: '12',
    type: 'special',
    data: { 
        label: 'Task manager', 
    },
    style: {
        backgroundColor: 'yellow',
        borderColor: 'tomato',
    },
    position: { x: 800, y: 380 },
    class: 'light',
  },
  {
    id: '13',
    type: 'special',
    data: { 
        label: 'Time management automation', 
    },
    style: {
        backgroundColor: 'yellow',
        borderColor: 'orange',
    },
    position: { x: 0, y: 500 },
    class: 'light',
  },
  {
    id: '14',
    type: 'special',
    data: { 
        label: 'Advanced data security', 
    },
    style: {
        backgroundColor: 'yellow',
        borderColor: 'black',
    },
    position: { x: 400, y: 500 },
    class: 'light',
  },
  {
    id: '15',
    type: 'special',
    data: { 
        label: 'Frontpage of the organisation', 
    },
    style: {
        backgroundColor: 'lightgreen',
        borderColor: 'purple',
    },
    position: { x: 600, y: 500 },
    class: 'light',
  },
  {
    id: '16',
    type: 'special',
    data: { 
        label: 'Modern leadership', 
    },
    style: {
        backgroundColor: 'yellow',
        borderColor: 'tomato',
    },
    position: { x: 1000, y: 500 },
    class: 'light',
  },
  {
    id: '17',
    type: 'special',
    data: { 
        label: 'Remote equipment shortage', 
    },
    style: {
        backgroundColor: 'yellow',
        borderColor: 'darkred',
    },
    position: { x: 1200, y: 500 },
    class: 'light',
  },
  {
    id: '18',
    type: 'special',
    data: { 
        label: 'Data scaling', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'darkblue',
    },
    position: { x: 200, y: 600 },
    class: 'light',
  },
  {
    id: '19',
    type: 'special',
    data: { 
        label: 'Routine software maintenance', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'orange',
    },
    position: { x: 0, y: 720 },
    class: 'light',
  },
  {
    id: '20',
    type: 'special',
    data: { 
        label: 'Threat intelligence', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'black',
    },
    position: { x: 400, y: 700 },
    class: 'light',
  },
  {
    id: '21',
    type: 'special',
    data: { 
        label: 'Social media presence', 
    },
    style: {
        backgroundColor: 'yellow',
        borderColor: 'purple',
    },
    position: { x: 600, y: 700 },
    class: 'light',
  },
  {
    id: '22',
    type: 'special',
    data: { 
        label: 'Open comms', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'tomato',
    },
    position: { x: 1000, y: 700 },
    class: 'light',
  },
  {
    id: '23',
    type: 'special',
    data: { 
        label: 'Remote monitoring', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'darkred',
    },
    position: { x: 1200, y: 700 },
    class: 'light',
  },
  {
    id: '24',
    type: 'special',
    data: { 
        label: 'Technology migration', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'darkblue',
    },
    position: { x: 200, y: 750 },
    class: 'light',
  },
  {
    id: '25',
    type: 'special',
    data: { 
        label: 'Group outliers', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'darkred',
    },
    position: { x: 1100, y: 800 },
    class: 'light',
  },
  {
    id: '26',
    type: 'special',
    data: { 
        label: 'Further problem detection', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'darkgreen',
    },
    position: { x: 400, y: 860 },
    class: 'light',
  },
  {
    id: '27',
    type: 'special',
    data: { 
        label: 'Customer service automation', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'purple',
    },
    position: { x: 600, y: 900 },
    class: 'light',
  },
  {
    id: '28',
    type: 'special',
    data: { 
        label: 'Regrouping', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'tomato',
    },
    position: { x: 800, y: 900 },
    class: 'light',
  },
  {
    id: '29',
    type: 'special',
    data: { 
        label: 'Evaluation', 
    },
    style: {
        backgroundColor: '#e84650',
        borderColor: 'darkgreen',
    },
    position: { x: 400, y: 1000 },
    class: 'light',
  },
]

export const initialEdges = [
  {
    id: 'e1-2',
    source: '1',
    target: '2',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e1-4',
    source: '1',
    target: '4',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e1-5',
    source: '1',
    target: '5',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e2-8',
    source: '2',
    target: '8',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e3-6',
    source: '3',
    target: '6',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e3-7',
    source: '3',
    target: '7',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e3-11',
    source: '3',
    target: '11',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e4-7',
    source: '4',
    target: '7',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e4-12',
    source: '4',
    target: '12',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e5-8',
    source: '5',
    target: '8',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e5-9',
    source: '5',
    target: '9',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e5-10',
    source: '5',
    target: '10',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e5-12',
    source: '5',
    target: '12',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e6-11',
    source: '6',
    target: '11',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e6-13',
    source: '6',
    target: '13',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e7-14',
    source: '7',
    target: '14',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e9-12',
    source: '9',
    target: '12',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e9-16',
    source: '9',
    target: '16',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e10-16',
    source: '10',
    target: '16',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e10-17',
    source: '10',
    target: '17',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e11-14',
    source: '11',
    target: '14',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e11-18',
    source: '11',
    target: '18',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e11-19',
    source: '11',
    target: '19',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e12-22',
    source: '12',
    target: '22',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e12-28',
    source: '12',
    target: '28',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e13-19',
    source: '13',
    target: '19',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e14-20',
    source: '14',
    target: '20',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e14-24',
    source: '14',
    target: '24',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e15-21',
    source: '15',
    target: '21',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e16-22',
    source: '16',
    target: '22',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e16-23',
    source: '16',
    target: '23',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e17-23',
    source: '17',
    target: '23',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e18-24',
    source: '18',
    target: '24',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e19-26',
    source: '19',
    target: '26',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e21-27',
    source: '21',
    target: '27',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e22-25',
    source: '22',
    target: '25',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e22-28',
    source: '22',
    target: '28',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e23-25',
    source: '23',
    target: '25',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e24-29',
    source: '24',
    target: '29',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e25-28',
    source: '25',
    target: '28',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e26-29',
    source: '26',
    target: '29',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e27-29',
    source: '27',
    target: '29',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
  {
    id: 'e28-29',
    source: '28',
    target: '29',
    markerEnd: MarkerType.ArrowClosed,
    animated: true,
  },
]
