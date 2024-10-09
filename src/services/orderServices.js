// export const finalizeOrder = async (orderData) => {
//     const token = localStorage.getItem('token');

//     try {
//         const response = await fetch('http://localhost:8000/api/orders', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`, // اطمینان از صحت استفاده از token
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(orderData), // ارسال orderData به شکل صحیح
//         });

//         if (!response.ok) {
//             const errorData = await response.json(); // گرفتن جزئیات بیشتر از خطا
//             throw new Error(`Failed to submit order: ${errorData.message}`);
//         }

//         const data = await response.json();
//         return data;
//     } catch (error) {
//         console.error('Error submitting order:', error);
//         throw error;
//     }
// }; 







export const finalizeOrder = async (orderData) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:8000/api/orders', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, // استفاده صحیح از template literal
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData), // ارسال orderData به شکل صحیح
        });

        if (!response.ok) {
            const errorData = await response.json(); // گرفتن جزئیات بیشتر از خطا
            throw new Error(`Failed to submit order: ${errorData.message}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error submitting order:', error);
        throw error;
    }
};