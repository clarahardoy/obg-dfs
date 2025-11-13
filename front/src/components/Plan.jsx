import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Boton from './Boton.jsx';
import { upgradeMembershipService } from '../services/membership.service.js';
import { setMembership } from '../features/auth.slice.js';
import '../styles/plan.css';
import { useTranslation } from 'react-i18next';

const Plan = () => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const membership = useSelector((state) => state.auth.membership) || localStorage.getItem('membership') || 'BASIC';
    const [loading, setLoading] = useState(false);

    if (membership !== 'BASIC') return null;

    const handleUpgrade = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const data = await upgradeMembershipService();
            dispatch(setMembership({ membership: data.membership, maxReadings: data.maxReadings }));
            localStorage.setItem('membership', data.membership);
            localStorage.setItem('maxReadings', String(data.maxReadings));

            toast.success(t('plan.toastSuccess'));
        } catch (err) {
            const msg = err?.response?.data?.message || t('plan.toastErrorGeneric');
            toast.error(msg);
            console.error('Upgrade membership error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <footer className="plan" role="contentinfo" aria-labelledby="plan-title">
            <div className="plan__content">
                <div className="plan__text">
                    <h2 id="plan-title" className="plan__title">
                        {t('plan.title')}
                    </h2>
                    <p className="plan__desc">
                        {t('plan.description')}
                    </p>
                </div>
                <div className="plan__actions">
                    <Boton onClick={handleUpgrade} disabled={loading}>
                        {loading ? t('plan.btnUpgrading') : t('plan.btnUpgrade')}
                    </Boton>
                </div>
            </div>
        </footer>
    );
};

export default Plan;