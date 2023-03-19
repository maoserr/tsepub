import {TsEpub} from '../src';
import 'mocha/mocha.js';
import {expect} from "chai";

describe('Add chapter',
    () => {
        it('should return true', async() => {
            const tsepub = new TsEpub({
                author: "",
                description: "",
                i18n: "en",
                publisher: "",
                tags: [""],
                title: ""
            })
            tsepub.add("test", "blah")
            await tsepub.generate()
            console.log("testing UI")
            expect(true).to.equal(true);
        });
    });
