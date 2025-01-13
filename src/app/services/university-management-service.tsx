import { DegreeInfo, UniversityInfo } from '../lib/definitions';

export async function fetchAllUniversities(): Promise<UniversityInfo[]> {
    try {
        const res = await fetch('/api/universities/get_all');
        if (!res.ok) {
            throw new Error('Failed to fetch universities');
        }
        const data = await res.json();
        
        // 转换数据结构以匹配 UniversityInfo 类型
        const universities: UniversityInfo[] = data.map((uni: any) => ({
            id: uni.id,
            university_name: uni.university_name,
            degree: {
                id: uni.degree_id,
                name: uni.degree_name
            },
            major: {
                id: uni.major_id,
                name: uni.major_name
            },
            program_duration: uni.program_duration,
            gre_requirement: uni.gre_requirement,
            university_logo_url: uni.university_logo_url,
            application_deadline: uni.application_deadline
        }));

        return universities;
    } catch (error) {
        console.error('Error fetching universities:', error);
        return [];
    }
}

export function calculateProgressPercentage(deadline: string | Date): number {
    const deadlineDate = new Date(deadline);
    const currentDate = new Date();
    // 获取应用开始日期（假设为当前日期往前100天，你可以根据实际情况调整）
    const startDate = new Date(currentDate.getTime() - 100 * 24 * 60 * 60 * 1000);
    const totalTime = startDate.getTime() - deadlineDate.getTime();
    const elapsedTime = currentDate.getTime() - startDate.getTime();
  
    let percentage = (elapsedTime / totalTime) * 100;
    percentage = Math.max(0, Math.min(100, percentage));
    return Math.round(percentage);
  }

export const selectAndAddUniversity = async (e: React.ChangeEvent<HTMLSelectElement>, session:any) => {
    
    const selectedUniversityId = e.target.value;
    console.log(session.data?.user?.id);
    console.log(session)
    const res = await fetch('/api/universities/add', {
        method: 'POST',
        body: JSON.stringify({university_id: selectedUniversityId, user_id: session.user?.id}),
    });
    if (res.ok) {
        console.log('University added successfully');
    } else {
        console.error('Failed to add university');
    }
    //refresh the page
    // window.location.reload();
}

export async function getDegreesByUniMajor(uni_id: string, major_id: string) {
  try {
    const response = await fetch(`/api/degrees/get_by_uni_major?uni_id=${uni_id}&major_id=${major_id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch degrees');
    }
    const data = await response.json();
    // 转换数据结构以匹配 DegreeInfo 类型
    const degrees: DegreeInfo[] = data.map((degree: any) => ({
        id: degree.id,
        name: degree.degree_name
    }));
    return degrees;
  } catch (error) {
    console.error('Error fetching degrees:', error);
    return []; // 出错时返回空数组
  }
}
