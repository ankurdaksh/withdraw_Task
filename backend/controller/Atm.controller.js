
import ATM from '../model/AtmModel.js';


 export const AtmController = async(req,res)=> {
    const { amount } = req.body;
    try {
        let atm = await ATM.findOne();
        const {  notes500, notes200, notes100 } = atm;
        let remainingAmount = amount;
        
        const totalAmountInATM =  (notes500 * 500) + (notes200 * 200) + (notes100 * 100);

        if (amount > totalAmountInATM) {
            throw new Error('Insufficient Balance');
        }
        const withdrawnNotes = {
            notes500: 0,
            notes200: 0,
            notes100: 0,
        };

        // Withdraw 500 rupee notes
        withdrawnNotes.notes500 = Math.min(Math.floor(remainingAmount / 500), notes500);
        remainingAmount -= withdrawnNotes.notes500 * 500;

        // Withdraw 200 rupee notes
        withdrawnNotes.notes200 = Math.min(Math.floor(remainingAmount / 200), notes200);
        remainingAmount -= withdrawnNotes.notes200 * 200;

        // Withdraw 100 rupee notes
        withdrawnNotes.notes100 = Math.min(Math.floor(remainingAmount / 100), notes100);
        remainingAmount -= withdrawnNotes.notes100 * 100;


        // Check if the requested amount can be withdrawn completely
        if (remainingAmount !== 0) {
            return  res.status(400).json({ error: 'Insufficient Funds' });
        }

        // Update ATM data
        atm.notes500 -= withdrawnNotes?.notes500;
        atm.notes200 -= withdrawnNotes?.notes200;
        atm.notes100 -= withdrawnNotes?.notes100;

        await atm.save();

        res.status(200).send({ message: 'Form withdraw successfully', withdrawnNotes });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}