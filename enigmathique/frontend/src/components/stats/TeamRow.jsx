import React from 'react';
import PropTypes from 'prop-types';
import { getPositionStyle, getPositionIcon} from './RankStyleManager';
import ActionButton from 'components/dashboard/ActionButton';


const TeamRow = ({index, team, detailsOnClick }) => {
    return (
        <tr key={team.id} className={`border-t border-[#CECDFD]  ${index % 2 == 0 ? 'bg-[#EBECF9]' : 'bg-[#F1F3FA]'}`}>
        <td className="p-5 flex items-center justify-left">
            <div className={`relative ${getPositionStyle(index)}`}>
                {getPositionIcon(index)}
                <span className="absolute inset-0 flex items-center justify-center">
                    {index + 1}
                </span>
            </div>
        </td>
        <td className="td-style">
            {team.name}
        </td>
        <td className="td-style">
            {team.calculatedScore}
        </td>
        <td className="td-style">
            {team.nbSolved}
        </td>
        <td className="td-style text-right">
            <ActionButton
                onClick={detailsOnClick}
                title='Détails'
            >
            </ActionButton>
        </td>
    </tr>
    );
}

TeamRow.propTypes = {
    index: PropTypes.number,
    team: PropTypes.object,
    detailsOnClick: PropTypes.func,
};
export default TeamRow;