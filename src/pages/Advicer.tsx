
import {useState, useEffect} from 'react';
import {useQuery, useLazyQuery} from '@apollo/client';
import {ADVISERDATA_QUERY} from '../components/query/queryUser';

// Components
import TopBar from '../components/Layout/TopBar';
import TreeView from '@mui/lab/TreeView';
import TreeItem from '@mui/lab/TreeItem';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

// Icons
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Interfaces
import {IAdviseeData, IAdviserData} from '../components/interfaces/InfOther';

// function FilteredStudentName(param: {studentData: IAdviseeData[]}){
//   return (
//     <div>
//         { param.studentData.map(({id, name}: IStudentData) => {
//             return ( 
//               <div key={id} className="dataItem">
//                 <p>{name}</p>
//               </div>
//             );
//           })
//         }
//     </div>
//   )
// }

interface GroupedByYear {
  year: string
  students: IAdviseeData[]
}

const defaultAdviserData: IAdviserData = {
  id: '',
  fullname: '',
  stu: []
}


// --> Main function component <--
function Adviser() {
  const {data, loading} = useQuery(ADVISERDATA_QUERY)
  const [initAdviseeData, setInitAdvisee] = useState<GroupedByYear[]>([])
  const [userInfo, setUserInfo] = useState<IAdviserData>(defaultAdviserData)


  function groupByYear(advisees: IAdviseeData[]): GroupedByYear[] {
    let groupedResult: GroupedByYear[] = []
    advisees?.map( async(stud: IAdviseeData) => {
      const index: number = await groupedResult.findIndex((year: GroupedByYear) => 
        year.year === stud.year_admit
      )

      if(index !== -1){
        await groupedResult[index].students.push(stud);
      }else{
        await groupedResult.push({
          year: stud.year_admit,
          students: [stud]
        })
      }
    })
    return groupedResult;
  }

  useEffect(() => {
    if(data){
      setUserInfo(data.advisor);
      setInitAdvisee(groupByYear(data.advisor.stu))
    }
  }, [data])

  if(loading) {return <p>loading...</p>}
  
  return (
    <>
      <TopBar UserInfo={userInfo}/>
      {/* <FilteredStudentName studentData={studentData} /> */}
      <Container sx={{display: 'flex', position: 'absolute', width: '30%', top: '13%', left: '12%'}}>
        <TreeView aria-label="multi-select"
            defaultCollapseIcon={<ExpandMoreIcon/>}
            defaultExpandIcon={<ChevronRightIcon/>}
            // expanded={expanded}
            // onNodeToggle={handleToggle}
            sx={{ width: '100%', height: 750, flexGrow: 1, overflowY: 'auto'}}
            multiSelect >
            {
                initAdviseeData.map((stdGroup: GroupedByYear, index: number) => (
                    <TreeItem sx={{marginBottom: '30px'}} 
                        key={index.toString()} 
                        nodeId={stdGroup.year} 
                        label={stdGroup.year} >
                      {
                        stdGroup.students.map((std: IAdviseeData, index: number) => (
                          <TreeItem key={std.id} nodeId={std.id.toString()} label={
                            <Box>
                              {/* <span style={{marginRight: '40px'}}>{std.s_code}</span> */}
                              <span>{std.student_id}</span>
                            </Box>
                          }/>
                        ))
                      }
                    </TreeItem>
                ))
                // data.advisor?.stu.map((stu: IAdviseeData) => 
                //   <Link underline="none">
                //       <p key={stu.id}>{stu.student_id}</p>
                //   </Link>
                // )
            }
        </TreeView>
      </Container>
    </>
  )
}

export default Adviser;

// const studentData: IStudentData[] = [
//     {
//       id: 1,
//       name: "Toon",
//       s_code: 610610625,
//       year: 4
//     },
//     {
//       id: 2,
//       name: "Hok",
//       s_code: 610610578,
//       year: 4
//     },
//     {
//       id: 3,
//       name: "Bam",
//       s_code: 610610623,
//       year: 4
//     },
//     {
//       id: 4,
//       name: "Toro",
//       s_code: 610610999,
//       year: 4
//     },
//     {
//       id: 5,
//       name: "Tii",
//       s_code: 610610888,
//       year: 4
//     },
//     {
//       id: 6,
//       name: "Earn",
//       s_code: 610610624,
//       year: 4
//     },
//     {
//       id: 7,
//       name: "Nat",
//       s_code: 610610777,
//       year: 4
//     },
//     {
//       id: 8,
//       name: "Sam",
//       s_code: 610610666,
//       year: 1
//     }
// ]

// const adviserData: IAdviserData = {
//   id: 'adv_01',
//   name: 'Chinawat',
//   advisee: [
//     {
//       id: 'acm2561',
//       acm_year: 2561,
//       students: studentData
//     }, 
//     {
//       id: 'acm2562',
//       acm_year: 2562,
//       students: studentData
//     },
//     {
//       id: 'acm2563',
//       acm_year: 2563,
//       students: studentData
//     }
//   ]
// }
