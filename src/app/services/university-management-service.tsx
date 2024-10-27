export async function fetchAllUniversities() {
    const res = await fetch('/api/universities/get_all');
    const data = await res.json();
    console.log(data);
    return data;
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
    const res = await fetch('/api/universities/add', {
        method: 'POST',
        body: JSON.stringify({university_id: selectedUniversityId, user_id: session.data?.user?.id}),
    });
    console.log(res);
    if (res.ok) {
        console.log('University added successfully');
    } else {
        console.error('Failed to add university');
    }
    //refresh the page
    window.location.reload();
}