import React from 'react'
import { LogoHeader } from '../../image/LogoHeader'
import { loadS3Image } from '../../helpers/Functions'

export const DimonsWizardLair = () => {
    return (
        <div>
            <LogoHeader />
            <div className='ml-8 mr-8'>
                <div className='text-white text-justify mb-8'>
                    to Miquel ♪ ♫ ♭ (1997-2022).
                </div>

                <div className=''>


                    <div>

                        <iframe title='scoresheets_model' className='mb-8 w-full'
                            src="https://sketchfab.com/models/8055873d72c54a3999b885ec6be60c15/embed?ui_theme=dark" height="720px" />


                        <div className='grid grid-cols-2'>
                            <img className='mb-8' alt='pic1'
                                src={loadS3Image('comic_page.jpg', 'dimon')}>
                            </img>

                            <img className='mb-8' alt='pic2'
                                src={loadS3Image('scoresheet_page.jpg', 'dimon')}>
                            </img>
                        </div>

                        <img className='w-full mb-8' alt='pic3'
                            src={loadS3Image('metal_plates.jpg', 'dimon')}>
                        </img>



                    </div>

                </div>


            </div>

        </div>

    )
}
