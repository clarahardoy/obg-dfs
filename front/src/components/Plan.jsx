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

    const [open, setOpen] = useState(false);
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
        <section className="plan" role="region" aria-labelledby="plan-title">
            <header
                className="plan__header"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
            >
                <span className={`plan__chevron ${open ? 'is-open' : ''}`} aria-hidden />
                <h2 id="plan-title" className="plan__title">{t('plan.title')}</h2>
                <span className="plan__cta-text">{t('plan.ctaAddPremium')}</span>
            </header>

            {open && (
                <div className="plan__body">
                    <p className="plan__desc">
                        {t('plan.description')}
                    </p>

                    <div className="plan__actions">
                        <Boton onClick={handleUpgrade} disabled={loading}>
                            {loading ? t('plan.btnUpgrading') : t('plan.btnUpgrade')}
                        </Boton>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Plan;