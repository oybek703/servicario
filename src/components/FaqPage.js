import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import {Container} from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular
    },
    pageTitle: {
        marginTop: '1em'
    }
}))
function FaqPage() {
    const classes = useStyles()
    return (
        <Container>
            <Typography className={classes.pageTitle} variant='h5' color='primary' align='center' gutterBottom paragraph>Frequently asked questions:</Typography>
            <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Can I make live chats during collaborations?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                       Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab alias asperiores aspernatur consequuntur, cum delectus dolorum eos et illo ipsa libero maiores maxime minus modi molestiae nisi nostrum numquam officiis provident quam quia quidem quo ratione reiciendis rem sapiente sequi. Deserunt ipsum laboriosam, nobis odio quae quaerat quod vel! Architecto ducimus et eveniet illum iure laborum molestias mollitia nobis placeat, quam quidem recusandae saepe voluptates? Amet blanditiis commodi culpa dolorum earum eius eligendi, eveniet expedita magnam minus, neque nulla possimus quia tenetur totam veritatis vero, voluptas? Accusamus adipisci aliquam, atque, consequatur consequuntur culpa deserunt dolor dolore doloremque ea eaque eveniet exercitationem fuga fugit ipsa itaque iure labore laborum laudantium magni maxime mollitia nulla obcaecati odit qui quia quibusdam quidem quos ratione recusandae reiciendis repellat soluta unde. Adipisci alias amet autem beatae, consequatur culpa cum cupiditate debitis dignissimos dolore earum enim ex excepturi exercitationem fuga harum illo incidunt, ipsam ipsum magnam minus modi molestiae mollitia nesciunt nihil nostrum nulla placeat possimus praesentium quibusdam quis repellendus sapiente, sed tenetur totam velit voluptatem! Ab aperiam consequuntur error exercitationem itaque porro quisquam. Blanditiis ea fugit nostrum provident sapiente. Architecto, quia quis? A commodi cum, explicabo fugit obcaecati omnis perspiciatis voluptas. Commodi doloribus et harum in labore maiores pariatur perferendis quaerat qui tempore vel, voluptatem! Illo maxime minima odit porro quaerat sed vel. Ab assumenda culpa eligendi enim eveniet hic incidunt labore magnam perferendis quaerat. Aliquam deleniti ea itaque magnam reiciendis reprehenderit temporibus. Aspernatur beatae consequuntur corporis dignissimos esse, fugiat ipsam laboriosam minima minus, natus necessitatibus, nihil nisi numquam perspiciatis quaerat quia quo quod quos suscipit tempora totam veniam vero. Cumque, ratione voluptatem? Ab accusantium aperiam autem, beatae consequatur dignissimos ducimus earum eius ex excepturi expedita explicabo inventore iste iure labore modi mollitia nisi nobis odit perferendis quae quas quisquam reiciendis repellat repellendus reprehenderit tempore ullam veniam voluptates voluptatum. Adipisci, animi asperiores aut consectetur deserunt eaque earum esse eveniet id ipsa ipsam magnam maiores non omnis optio pariatur possimus quae quam quas quasi qui reprehenderit saepe sapiente sit totam unde vero voluptate. Amet blanditiis commodi, dicta dignissimos officia tempora velit voluptatibus. Ad aliquid assumenda aut eum natus? Debitis fugiat inventore labore neque quisquam quo repellendus vel voluptate. Accusamus, accusantium beatae blanditiis consequuntur dolorem error et fuga fugiat harum illum in incidunt inventore iure laudantium magnam necessitatibus non nulla possimus quas qui quibusdam quo sed sit soluta unde vel voluptatibus. Eos labore nam porro sapiente veritatis.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className={classes.heading}>Do I need to have account for making collaborations?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography className={classes.heading}>Is it free using servicario platform?</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis consectetur cum, id nam necessitatibus nihil nulla reiciendis sequi similique voluptatem? Corporis cumque dicta distinctio eaque eveniet facere illum iste minus natus, nihil, odit pariatur porro quasi sed, vel vero voluptas. Accusamus deleniti earum, ex praesentium quod rem tempore. Ab dicta earum itaque nulla perferendis quidem repellendus voluptate? Aliquam dolor repellendus voluptate! Animi dolore in odit? Aliquid deserunt, dolor dolorem et officiis quasi quibusdam quis ratione repellat tempora. Culpa deleniti doloribus similique tempore veniam voluptatem. Architecto, atque blanditiis consectetur debitis deleniti dicta distinctio dolores eligendi eos error et eveniet fugiat harum id ipsum iusto maiores molestiae nemo non obcaecati quae quidem quis quo quos reiciendis repudiandae sequi sit velit veritatis vitae. Aliquid dolorum, ducimus eos, error excepturi expedita maiores nobis nulla obcaecati reprehenderit tenetur, unde voluptate. Accusantium corporis culpa cumque dolor dolore dolorem earum est explicabo facere fugiat impedit ipsum iusto maxime nam necessitatibus odio odit perspiciatis placeat quae quas quia quidem quisquam ratione reiciendis repellendus repudiandae sed vel veniam, veritatis voluptas! Aperiam aut cumque delectus, illo omnis perspiciatis possimus quae quia rem sit soluta, sunt, vel voluptas? Corporis dolor, neque! Aperiam atque error est iste maxime perferendis possimus provident quidem.</Typography>
                </AccordionDetails>
            </Accordion>
        </div>
        </Container>
    )
}

export default FaqPage